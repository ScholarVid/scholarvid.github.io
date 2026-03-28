/**
 * اسکالروید - اسکریپت‌های اصلی
 * نسخه نهایی - بهینه‌شده
 */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initTheme();
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
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
        setTimeout(() => preloader.style.display = 'none', 400);
    }, 1200);
}

// ========== Theme Toggle ==========
function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const icon = toggle.querySelector('i');
    const tooltip = toggle.querySelector('.tooltip');
    
    const savedTheme = localStorage.getItem('scholarvid-theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.className = 'fas fa-sun';
        tooltip.textContent = 'حالت روشن';
    }
    
    toggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            icon.className = 'fas fa-moon';
            tooltip.textContent = 'حالت تاریک';
            localStorage.setItem('scholarvid-theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            icon.className = 'fas fa-sun';
            tooltip.textContent = 'حالت روشن';
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
        icon.className = menu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
    });
    
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            btn.querySelector('i').className = 'fas fa-bars';
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
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });
}

// ========== Header Scroll Effect ==========
function initHeaderScroll() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ========== Scholarship Filter & Search ==========
function initScholarshipFilter() {
    const cards = document.querySelectorAll('.scholarship-card');
    const searchInput = document.getElementById('searchInput');
    const levelFilter = document.getElementById('levelFilter');
    const sortFilter = document.getElementById('sortFilter');
    const footerFilters = document.querySelectorAll('.footer-links a[data-filter]');
    
    function filterScholarships(country, searchTerm, level, sortBy) {
        const terms = searchTerm.toLowerCase().split(' ').filter(t => t);
        
        cards.forEach(card => {
            const cardCountry = card.dataset.country;
            const cardLevel = card.dataset.level;
            const cardText = card.textContent.toLowerCase();
            
            const matchCountry = !country || country === 'all' || cardCountry === country;
            const matchSearch = terms.length === 0 || terms.every(term => cardText.includes(term));
            const matchLevel = !level || cardLevel.includes(level);
            
            if (matchCountry && matchSearch && matchLevel) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => card.style.display = 'none', 250);
            }
        });
        
        // Sort
        if (sortBy && sortBy !== 'newest') {
            const grid = document.getElementById('scholarshipsGrid');
            const visible = Array.from(cards).filter(c => c.style.display !== 'none');
            
            if (sortBy === 'deadline') {
                visible.sort((a, b) => {
                    const dateA = a.querySelector('.meta-item:last-child')?.textContent || '';
                    const dateB = b.querySelector('.meta-item:last-child')?.textContent || '';
                    return dateA.localeCompare(dateB, 'fa');
                });
            }
            visible.forEach(card => grid.appendChild(card));
        }
    }
    
    // Footer category filters
    footerFilters.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = link.dataset.filter;
            filterScholarships(filter, searchInput?.value || '', levelFilter?.value || '', sortFilter?.value || 'newest');
            document.querySelector('#scholarships')?.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    searchInput?.addEventListener('input', () => {
        const country = document.querySelector('.footer-links a.active')?.dataset.filter || 'all';
        filterScholarships(country, searchInput.value, levelFilter?.value || '', sortFilter?.value || 'newest');
    });
    
    levelFilter?.addEventListener('change', () => {
        filterScholarships('all', searchInput?.value || '', levelFilter.value, sortFilter?.value || 'newest');
    });
    
    sortFilter?.addEventListener('change', () => {
        filterScholarships('all', searchInput?.value || '', levelFilter?.value || '', sortFilter.value);
    });
}

// ========== Back to Top ==========
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.pageYOffset > 400);
    });
    btn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ========== Modal ==========
function initModal() {
    const modal = document.getElementById('scholarshipModal');
    
    modal?.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) closeModal();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function openModal(id) {
    const modal = document.getElementById('scholarshipModal');
    const modalBody = document.getElementById('modalBody');
    
    const data = {
        ksu: {
            flag: 'https://flagcdn.com/w320/sa.png',
            country: 'عربستان سعودی',
            title: 'بورسیه دانشگاه ملک سعود',
            deadline: '۳۰ اپریل ۲۰۲۶',
            levels: 'لیسانس، ماستری، دکترا',
            fields: 'علوم، مهندسی، پزشکی، علوم انسانی',
            benefits: [
                'پوشش ۱۰۰٪ شهریه دانشگاه',
                'حقوق ماهیانه: ۹۰۰ ریال (لیسانس) تا ۳۰۰۰ ریال (دکترا)',
                'اسکان رایگان در خوابگاه‌های دانشگاه',
                'بیمه درمانی کامل',
                'بلیط رفت و برگشت سالیانه',
                'دوره آماده‌سازی زبان عربی رایگان'
            ],
            requirements: [
                'معدل حداقل ۸۰٪ برای لیسانس، ۸۵٪ برای مقاطع بالاتر',
                'گواهی سلامت پزشکی',
                'عدم سوء پیشینه',
                'توصیه‌نامه از دو استاد (برای ماستری و دکترا)',
                'انگیزه‌نامه به زبان انگلیسی یا عربی'
            ],
            applyUrl: 'https://t.me/Saudi_Scholarships'
        },
        uae: {
            flag: 'https://flagcdn.com/w320/ae.png',
            country: 'امارات متحده',
            title: 'بورسیه دانشگاه امارات',
            deadline: '۱۵ می ۲۰۲۶',
            levels: 'ماستری، دکترا',
            fields: 'هوش مصنوعی، انرژی‌های تجدیدپذیر، علوم پزشکی',
            benefits: [
                'معافیت کامل از شهریه',
                'کمک هزینه زندگی ماهیانه ۳۰۰۰-۵۰۰۰ درهم',
                'بیمه درمانی جامع',
                'دسترسی به آزمایشگاه‌های پیشرفته',
                'فرصت‌های پژوهشی بین‌المللی'
            ],
            requirements: [
                'معدل لیسانس حداقل ۳.۰ از ۴.۰',
                'مدرک زبان: آیلتس ۶.۵ یا معادل',
                'پروپوزال پژوهشی (برای دکترا)',
                'دو توصیه‌نامه آکادمیک',
                'رزومه علمی به‌روز'
            ],
            applyUrl: 'https://t.me/Saudi_Scholarships'
        },
        turkey: {
            flag: 'https://flagcdn.com/w320/tr.png',
            country: 'ترکیه',
            title: 'بورسیه دولت ترکیه (Türkiye Bursları)',
            deadline: '۱ ژوئن ۲۰۲۶',
            levels: 'لیسانس، ماستری',
            fields: 'تمامی رشته‌های دانشگاهی',
            benefits: [
                'تحصیل رایگان در بیش از ۱۵۰ دانشگاه',
                'حقوق ماهیانه: ۱۱۰۰ لیر (لیسانس) تا ۱۶۰۰ لیر (دکترا)',
                'اسکان رایگان در خوابگاه‌های دولتی',
                'بلیط رفت و برگشت بین‌المللی',
                'دوره یک‌ساله زبان ترکی رایگان',
                'بیمه درمانی کامل'
            ],
            requirements: [
                'معدل حداقل ۷۰٪ برای لیسانس، ۷۵٪ برای ماستری',
                'سن حداکثر ۲۱ سال برای لیسانس، ۳۰ برای ماستری',
                'عدم داشتن اقامت ترکیه',
                'مدارک تحصیلی ترجمه‌شده به انگلیسی یا ترکی',
                'عکس پرسنلی و کپی پاسپورت'
            ],
            applyUrl: 'https://t.me/Saudi_Scholarships'
        },
        qatar: {
            flag: 'https://flagcdn.com/w320/qa.png',
            country: 'قطر',
            title: 'بورسیه دانشگاه قطر',
            deadline: '۲۰ می ۲۰۲۶',
            levels: 'ماستری، دکترا',
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
                'معدل ماستری حداقل ۳.۲ از ۴.۰',
                'مدرک زبان: آیلتس ۶.۵ یا تافل ۹۰',
                'پروپوزال پژوهشی دقیق و نوآورانه',
                'سه توصیه‌نامه آکادمیک',
                'مقالات منتشرشده (امتیاز مثبت)'
            ],
            applyUrl: 'https://t.me/Saudi_Scholarships'
        }
    };
    
    const item = data[id];
    if (!item) return;
    
    modalBody.innerHTML = `
        <div class="modal-header">
            <img src="${item.flag}" alt="${item.country}" class="country-flag-img">
            <h3>${item.title}</h3>
        </div>
        
        <div class="modal-details">
            <div class="detail-item">
                <i class="fas fa-map-marker-alt"></i>
                <span><strong>کشور:</strong> ${item.country}</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-calendar-check"></i>
                <span><strong>مهلت ثبت‌نام:</strong> ${item.deadline}</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-graduation-cap"></i>
                <span><strong>مقاطع:</strong> ${item.levels}</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-book-open"></i>
                <span><strong>رشته‌ها:</strong> ${item.fields}</span>
            </div>
        </div>
        
        <div class="modal-benefits">
            <h4><i class="fas fa-gift"></i> مزایای بورسیه:</h4>
            <ul>
                ${item.benefits.map(b => `<li><i class="fas fa-check-circle"></i> ${b}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-requirements">
            <h4><i class="fas fa-clipboard-list"></i> شرایط و مدارک:</h4>
            <ul>
                ${item.requirements.map(r => `<li><i class="fas fa-arrow-left"></i> ${r}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-footer">
            <a href="${item.applyUrl}" target="_blank" class="btn btn-primary btn-lg">
                <i class="fas fa-paper-plane"></i>
                شروع ثبت‌نام در تلگرام
            </a>
            <p><i class="fas fa-info-circle"></i> برای راهنمایی بیشتر و ارسال مدارک، به کانال تلگرام مراجعه کنید</p>
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

// ========== Toast ==========
function initToast() {
    window.showToast = (message, type = 'success') => {
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
        setTimeout(() => toast.classList.remove('show'), 4000);
    };
}

// ========== Form Handlers ==========
function sendContact(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال ارسال...';
    btn.disabled = true;
    
    setTimeout(() => {
        showToast('✅ پیام شما با موفقیت ارسال شد!');
        e.target.reset();
        btn.innerHTML = original;
        btn.disabled = false;
    }, 1500);
}
