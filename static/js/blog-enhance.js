// 阅读进度条
(function() {
    var progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });
})();

// 返回顶部按钮
(function() {
    var backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
})();

// 代码复制按钮
(function() {
    var codeBlocks = document.querySelectorAll('.code-block, pre > code');
    
    codeBlocks.forEach(function(block) {
        var parent = block.closest('.code-block') || block.parentElement;
        if (!parent) return;
        
        parent.style.position = 'relative';
        
        var copyBtn = document.createElement('button');
        copyBtn.className = 'code-copy-btn';
        copyBtn.textContent = '复制';
        
        copyBtn.addEventListener('click', function() {
            var code = block.textContent || block.innerText;
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(code).then(function() {
                    copyBtn.textContent = '已复制';
                    copyBtn.classList.add('copied');
                    setTimeout(function() {
                        copyBtn.textContent = '复制';
                        copyBtn.classList.remove('copied');
                    }, 2000);
                });
            } else {
                var textarea = document.createElement('textarea');
                textarea.value = code;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                
                try {
                    document.execCommand('copy');
                    copyBtn.textContent = '已复制';
                    copyBtn.classList.add('copied');
                    setTimeout(function() {
                        copyBtn.textContent = '复制';
                        copyBtn.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    console.error('复制失败:', err);
                }
                
                document.body.removeChild(textarea);
            }
        });
        
        parent.appendChild(copyBtn);
    });
})();
