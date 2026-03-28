/**
 * اسکالروید - اسکریپت‌های اصلی
 * نسخه: 2.0 | تاریخ: ۲۰۲۶
 */

// ========== تنظیمات  اولیه ==========
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initTheme();
    initMobileMenu();
    initSmoothScroll();
    initStatsCounter();
    initScholarshipFilter();
    initBackToTop();
    initModal();
    initToast();
});

// ========== Preloader ==========
function initPreloader() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
}

// ========== Theme Toggle ==========
function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const icon = toggle.querySelector('i');
    
    // بررسی تم ذخیره‌شده
    const savedTheme = localStorage.getItem('scholarvid-theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
    
    toggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('scholarvid-theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('scholarvid-theme', 'dark');
        }
    });
}

// ========== Mobile Menu ==========
function initMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.mobile-menu');
    
    btn?.addEventListener('click', () => {
        menu.classList.toggle('active');
        const icon = btn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
    
    // بستن منو با کلیک روی لینک‌ها
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            btn.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });
}

// ========== Smooth Scroll ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== Stats Counter Animation ==========
function initStatsCounter() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = { threshold: 0.5 };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

// ========== Scholarship Filter & Search ==========
function initScholarshipFilter() {
    const cards = document.querySelectorAll('.scholarship-card');
    const categoryBtns = document.querySelectorAll('.category-card');
    const searchInput = document.getElementById('searchInput');
    const levelFilter = document.getElementById('levelFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    // فیلتر دسته‌بندی
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // حذف کلاس active از همه
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            filterScholarships(filter, searchInput?.value || '', levelFilter?.value || '', sortFilter?.value || 'newest');
        });
    });
    
    // جستجو
    searchInput?.addEventListener('input', () => {
        const activeCategory = document.querySelector('.category-card.active')?.dataset.filter || 'all';
        filterScholarships(activeCategory, searchInput.value, levelFilter?.value || '', sortFilter?.value || 'newest');
    });
    
    // فیلتر مقطع
    levelFilter?.addEventListener('change', () => {
        const activeCategory = document.querySelector('.category-card.active')?.dataset.filter || 'all';
        filterScholarships(activeCategory, searchInput?.value || '', levelFilter.value, sortFilter?.value || 'newest');
    });
    
    // مرتب‌سازی
    sortFilter?.addEventListener('change', () => {
        const activeCategory = document.querySelector('.category-card.active')?.dataset.filter || 'all';
        filterScholarships(activeCategory, searchInput?.value || '', levelFilter?.value || '', sortFilter.value);
    });
    
    function filterScholarships(category, searchTerm, level, sortBy) {
        const terms = searchTerm.toLowerCase().split(' ');
        
        cards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardLevel = card.dataset.level;
            const cardText = card.textContent.toLowerCase();
            
            // فیلتر دسته‌بندی
            const matchCategory = category === 'all' || cardCategory === category;
            
            // فیلتر جستجو
            const matchSearch = terms.every(term => cardText.includes(term));
            
            // فیلتر مقطع
            const matchLevel = !level || cardLevel.includes(level);
            
            // نمایش/مخفی کردن
            if (matchCategory && matchSearch && matchLevel) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // مرتب‌سازی
        if (sortBy !== 'newest') {
            const grid = document.getElementById('scholarshipsGrid');
            const visibleCards = Array.from(cards).filter(c => c.style.display !== 'none');
            
            if (sortBy === 'deadline') {
                // مرتب‌سازی بر اساس مهلت (ساده‌شده)
                visibleCards.sort((a, b) => {
                    const dateA = a.querySelector('.meta-item:last-child')?.textContent || '';
                    const dateB = b.querySelector('.meta-item:last-child')?.textContent || '';
                    return dateA.localeCompare(dateB, 'fa');
                });
            } else if (sortBy === 'popular') {
                // کارت‌های ویژه اول
                visibleCards.sort((a, b) => {
                    const aFeatured = a.querySelector('.card-badge.featured') ? 1 : 0;
                    const bFeatured = b.querySelector('.card-badge.featured') ? 1 : 0;
                    return bFeatured - aFeatured;
                });
            }
            
            visibleCards.forEach(card => grid.appendChild(card));
        }
    }
}

// ========== Back to Top ==========
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
    
    btn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========== Modal ==========
function initModal() {
    const modal = document.getElementById('scholarshipModal');
    
    // بستن مودال با کلیک بیرون
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // بستن با دکمه ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function openModal(scholarshipId) {
    const modal = document.getElementById('scholarshipModal');
    const modalBody = document.getElementById('modalBody');
    
    // داده‌های نمونه برای هر بورسیه
    const scholarships = {
        ksu: {
            country: '🇸🇦 عربستان سعودی',
            title: 'بورسیه دانشگاه ملک سعود',
            deadline: '۳۰ اپریل ۲۰۲۶',
            levels: 'کارشناسی، کارشناسی ارشد، دکترا',
            fields: 'علوم، مهندسی، پزشکی، علوم انسانی',
            benefits: [
                'پوشش ۱۰۰٪ شهریه دانشگاه',
                'حقوق ماهیانه: ۹۰۰ ریال (کارشناسی) تا ۳۰۰۰ ریال (دکترا)',
                'اسکان رایگان در خوابگاه‌های دانشگاه',
                'بیمه درمانی کامل',
                'بلیط رفت و برگشت سالیانه',
                'دوره آماده‌سازی زبان عربی رایگان'
            ],
            requirements: [
                'معدل حداقل ۸۰٪ برای کارشناسی، ۸۵٪ برای مقاطع بالاتر',
                'گواهی سلامت پزشکی',
                'عدم سوء پیشینه',
                'توصیه‌نامه از دو استاد (برای ارشد و دکترا)',
                'انگیزه‌نامه به زبان انگلیسی یا عربی'
            ],
            applyUrl: 'https://t.me/scholarvid'
        },
        uae: {
            country: '🇦🇪 امارات متحده',
            title: 'بورسیه دانشگاه امارات',
            deadline: '۱۵ می ۲۰۲۶',
            levels: 'کارشناسی ارشد، دکترا',
            fields: 'هوش مصنوعی، انرژی‌های تجدیدپذیر، علوم پزشکی',
            benefits: [
                'معافیت کامل از شهریه',
                'کمک هزینه زندگی ماهیانه ۳۰۰۰-۵۰۰۰ درهم',
                'بیمه درمانی جامع',
                'دسترسی به آزمایشگاه‌های پیشرفته',
                'فرصت‌های پژوهشی بین‌المللی'
            ],
            requirements: [
                'معدل کارشناسی حداقل ۳.۰ از ۴.۰',
                'مدرک زبان: آیلتس ۶.۵ یا معادل',
                'پروپوزال پژوهشی (برای دکترا)',
                'دو توصیه‌نامه آکادمیک',
                'رزومه علمی به‌روز'
            ],
            applyUrl: 'https://t.me/scholarvid'
        },
        turkey: {
            country: '🇹🇷 ترکیه',
            title: 'بورسیه دولت ترکیه (Türkiye Bursları)',
            deadline: '۱ ژوئن ۲۰۲۶',
            levels: 'کارشناسی، کارشناسی ارشد',
            fields: 'تمامی رشته‌های دانشگاهی',
            benefits: [
                'تحصیل رایگان در بیش از ۱۵۰ دانشگاه',
                'حقوق ماهیانه: ۱۱۰۰ لیر (کارشناسی) تا ۱۶۰۰ لیر (دکترا)',
                'اسکان رایگان در خوابگاه‌های دولتی',
                'بلیط رفت و برگشت بین‌المللی',
                'دوره یک‌ساله زبان ترکی رایگان',
                'بیمه درمانی کامل'
            ],
            requirements: [
                'معدل حداقل ۷۰٪ برای کارشناسی، ۷۵٪ برای ارشد',
                'سن حداکثر ۲۱ سال برای کارشناسی، ۳۰ برای ارشد',
                'عدم داشتن اقامت ترکیه',
                'مدارک تحصیلی ترجمه‌شده به انگلیسی یا ترکی',
                'عکس پرسنلی و کپی پاسپورت'
            ],
            applyUrl: 'https://t.me/scholarvid'
        },
        qatar: {
            country: '🇶🇦 قطر',
            title: 'بورسیه دانشگاه قطر',
            deadline: '۲۰ می ۲۰۲۶',
            levels: 'کارشناسی ارشد، دکترا',
            fields: 'مهندسی، علوم کامپیوتر، علوم اجتماعی',
            benefits: [
                'پوشش کامل هزینه‌های تحصیلی',
                'حقوق پژوهشی ماهیانه ۴۰۰۰-۷۰۰۰ ریال قطر',
                'اسکان دانشگاهی یا کمک هزینه مسکن',
                'بیمه درمانی و دندانپزشکی',
                'بودجه پژوهشی برای کنفرانس‌ها',
                'دسترسی به کتابخانه‌های دیجیتال جهانی'
            ],
            requirements: [
                'معدل کارشناسی ارشد حداقل ۳.۲ از ۴.۰',
                'مدرک زبان: آیلتس ۶.۵ یا تافل ۹۰',
                'پروپوزال پژوهشی دقیق و نوآورانه',
                'سه توصیه‌نامه آکادمیک',
                'مقالات منتشرشده (امتیاز مثبت)'
            ],
            applyUrl: 'https://t.me/scholarvid'
        }
    };
    
    const data = scholarships[scholarshipId];
    if (!data) return;
    
    modalBody.innerHTML = `
        <div class="modal-body">
            <div class="modal-header">
                <div class="country-flag">${data.country}</div>
                <h3>${data.title}</h3>
            </div>
            
            <div class="modal-details">
                <div class="detail-item">
                    <i class="fas fa-calendar-check"></i>
                    <span><strong>مهلت ثبت‌نام:</strong> ${data.deadline}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-graduation-cap"></i>
                    <span><strong>مقاطع:</strong> ${data.levels}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-book-open"></i>
                    <span><strong>رشته‌ها:</strong> ${data.fields}</span>
                </div>
            </div>
            
            <div class="modal-benefits">
                <h4>✨ مزایای بورسیه:</h4>
                <ul>
                    ${data.benefits.map(b => `<li><i class="fas fa-check-circle"></i> ${b}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-benefits">
                <h4>📋 شرایط و مدارک:</h4>
                <ul>
                    ${data.requirements.map(r => `<li><i class="fas fa-arrow-left"></i> ${r}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-footer">
                <a href="${data.applyUrl}" target="_blank" class="btn btn-primary btn-lg">
                    <i class="fas fa-paper-plane"></i>
                    شروع ثبت‌نام در تلگرام
                </a>
                <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-muted);">
                    <i class="fas fa-info-circle"></i>
                    برای راهنمایی بیشتر و ارسال مدارک، به کانال تلگرام اسکالروید مراجعه کنید
                </p>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('scholarshipModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ========== Toast Notification ==========
function initToast() {
    // Toast به صورت جهانی در دسترس است
    window.showToast = function(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        const icon = toast.querySelector('i');
        
        toastMessage.textContent = message;
        
        if (type === 'error') {
            icon.className = 'fas fa-exclamation-circle';
            icon.style.color = 'var(--danger)';
            toast.style.borderRightColor = 'var(--danger)';
        } else {
            icon.className = 'fas fa-check-circle';
            icon.style.color = 'var(--success)';
            toast.style.borderRightColor = 'var(--success)';
        }
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    };
}

// ========== Form Handlers ==========
function subscribeNewsletter(e) {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    
    // اینجا می‌توانید به API خود متصل شوید
    showToast('✅ ایمیل شما با موفقیت ثبت شد! خبرنامه بورسیه‌ها فعال شد.');
    e.target.reset();
}

function sendContact(e) {
    e.preventDefault();
    
    // نمایش لودینگ
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال ارسال...';
    btn.disabled = true;
    
    // شبیه‌سازی ارسال
    setTimeout(() => {
        showToast('✅ پیام شما با موفقیت ارسال شد! به زودی با شما تماس می‌گیریم.');
        e.target.reset();
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 1500);
}

function subscribeFooter(e) {
    e.preventDefault();
    showToast('✅ عضویت در خبرنامه با موفقیت انجام شد!');
    e.target.reset();
}

// ========== Load More Button ==========
document.getElementById('loadMoreBtn')?.addEventListener('click', function() {
    showToast('📚 بورسیه‌های بیشتر به زودی اضافه می‌شوند! برای اطلاع فوری، کانال تلگرام را دنبال کنید.');
});

// ========== Header Scroll Effect ==========
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.pageYOffset > 50) {
        header.style.boxShadow = 'var(--shadow-lg)';
        header.style.background = 'rgba(255,255,255,0.98)';
    } else {
        header.style.boxShadow = 'none';
        header.style.background = 'rgba(255,255,255,0.95)';
    }
});
