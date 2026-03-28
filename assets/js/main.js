/**
 * اسکالروید - اسکریپت‌های اصلی
 * نسخه نهایی ساده‌شده
 */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initTheme();
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
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
    
    const savedTheme = localStorage.getItem('scholarvid-theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.className = 'fas fa-sun';
    }
    
    toggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            icon.className = 'fas fa-moon';
            localStorage.setItem('scholarvid-theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            icon.className = 'fas fa-sun';
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
                const headerOffset = 70;
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
        header.classList.toggle('scrolled', window.pageYOffset > 50);
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
    title: 'بورسیه‌های وزارت تعلیم عربستان',
    deadline: 'به زودی... (تا وقت باز شدن اسناد تان را آماده کنید)',
    levels: 'لیسانس، ماستری، دکتورا',
    fields: 'علوم عصری (اینجینیری کامپیوتر، اقتصاد، علوم ساینسی) – علوم شرعی (قرآن، حدیث، فقه، عقیده،  زبان عربی، حقوق)',
    benefits: [
        'بلیت رفت و برگشت سالانه رایگان',
        'اقامت رایگان',
        'بیمه درمانی رایگان',
        'مدد معاش ماهیانه ۸۵۰ ریال سعودی',
        'کمک مالی سالیانه برای خرید کتاب و لوازم تحصیلی',
        'امتیاز مالی برای دانشجویان با نمره بالا',
        'سفرهای تفریحی رایگان',
        'فرصت حج و عمره رایگان'
    ],
    requirements: [
        '📁 اسناد لازم برای ثبت‌نام لیسانس:',
        '1️⃣ سافت عکس (بدون عینک و کلاه)',
        '2️⃣ پاسپورت معتبر',
        '3️⃣ شهادتنامه',
        '4️⃣ ترجمه عربی شهادتنامه',
        '5️⃣ نمرات سه ساله',
        '6️⃣ ترجمه عربی نمرات سه ساله',
        '7️⃣ تزکیه (Recommendation Letter)',
        '',
        '📁 اسناد لازم برای ثبت‌نام ماستری و دکترا:',
        '1️⃣ سافت عکس (بدون عینک و کلاه)',
        '2️⃣ پاسپورت معتبر',
        '3️⃣ سرتیفیکت (شهادتنامه) مرحله قبلی',
        '4️⃣ ترجمه عربی سرتیفیکت',
        '5️⃣ ترانسکریپت (نمرات) مرحله قبلی',
        '6️⃣ ترجمه عربی ترانسکریپت',
        '7️⃣ تزکیه (Recommendation Letter)',
        '',
        '📌 اسناد اختیاری مؤثر در پذیرش:',
        ' مدرک زبان عربی یا انگلیسی',
        ' شهادتنامه حفظ قرآن یا سایر شهادتنامه های معتبر',
        '',
        '❗️ شرط معدل: نمرات سه ساله متقاضی کمتر از ۷۵٪ نباشد.',
        '',
        '✅ پس از قبولی، ارائه این مدارک نیز لازم است:',
        ' فرم صحی  + ترجمه عربی',
        ' فرم عدم مسئولیت جرمی  + ترجمه عربی'
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

// ========== Form Handler (در صورت نیاز) ==========
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
