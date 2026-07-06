// Supabase Authentication Module
const Auth = {
    // Supabase 配置
    config: {
        url: 'https://sruhsitckdvvghzssek.supabase.co',
        anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNydWhzaXRja2R2dmdmaHpzc2VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzMzc1OTAsImV4cCI6MjA5ODkxMzU5MH0.Q5zInj3yn10n2nMhRVhgXzoAViIM8favchwufGxsdH0'
    },
    
    // Supabase 客户端
    client: null,
    
    // 初始化
    init() {
        // 动态加载 Supabase SDK
        if (!window.supabase) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
            script.onload = () => {
                this.client = window.supabase.createClient(this.config.url, this.config.anonKey);
                this.checkAuth();
                this.setupUI();
            };
            document.head.appendChild(script);
        } else {
            this.client = window.supabase.createClient(this.config.url, this.config.anonKey);
            this.checkAuth();
            this.setupUI();
        }
    },
    
    // 检查登录状态
    async checkAuth() {
        if (!this.client) return;
        
        const { data: { session } } = await this.client.auth.getSession();
        
        if (session) {
            this.onLogin(session.user);
        } else {
            this.onLogout();
        }
        
        // 监听登录状态变化
        this.client.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session) {
                this.onLogin(session.user);
            } else if (event === 'SIGNED_OUT') {
                this.onLogout();
            }
        });
    },
    
    // 登录成功回调
    onLogin(user) {
        console.log('User logged in:', user.email);
        
        // 更新 UI
        const authContainer = document.getElementById('user-auth');
        if (authContainer) {
            authContainer.innerHTML = `
                <div class="user-info">
                    <span class="user-email">${user.email}</span>
                    <button class="auth-btn auth-btn-logout" onclick="Auth.logout()">退出</button>
                </div>
            `;
        }
        
        // 触发自定义事件
        window.dispatchEvent(new CustomEvent('auth:login', { detail: user }));
    },
    
    // 登出回调
    onLogout() {
        console.log('User logged out');
        
        // 更新 UI
        const authContainer = document.getElementById('user-auth');
        if (authContainer) {
            authContainer.innerHTML = `
                <a href="/login.html" class="auth-btn auth-btn-login">登录</a>
            `;
        }
        
        // 触发自定义事件
        window.dispatchEvent(new CustomEvent('auth:logout'));
    },
    
    // 登出
    async logout() {
        if (!this.client) return;
        
        const { error } = await this.client.auth.signOut();
        
        if (error) {
            console.error('Logout error:', error);
        }
    },
    
    // 获取当前用户
    async getUser() {
        if (!this.client) return null;
        
        const { data: { session } } = await this.client.auth.getSession();
        return session?.user || null;
    },
    
    // 设置 UI
    setupUI() {
        // 创建认证容器（如果不存在）
        let authContainer = document.getElementById('user-auth');
        if (!authContainer) {
            authContainer = document.createElement('div');
            authContainer.id = 'user-auth';
            authContainer.className = 'user-auth';
            
            // 插入到导航栏
            const nav = document.querySelector('.header-nav') || document.querySelector('nav') || document.body;
            nav.appendChild(authContainer);
        }
    }
};

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    Auth.init();
});
