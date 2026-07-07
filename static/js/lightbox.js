// 灯箱效果
(function() {
    // 创建灯箱HTML
    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = '<span class="lightbox-close">&times;</span><img src="" alt="">';
    document.body.appendChild(overlay);
    
    var lightboxImg = overlay.querySelector('img');
    var closeBtn = overlay.querySelector('.lightbox-close');
    
    // 获取所有文章内容中的图片
    var contentImages = document.querySelectorAll('.single-page #content img, .post-content img');
    
    contentImages.forEach(function(img) {
        // 添加点击事件
        img.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            lightboxImg.src = this.src || this.getAttribute('data-src');
            lightboxImg.alt = this.alt;
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // 添加鼠标悬停效果
        img.style.cursor = 'zoom-in';
    });
    
    // 关闭灯箱
    function closeLightbox() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeLightbox();
        }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeLightbox();
        }
    });
})();
