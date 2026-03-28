/**
 * اسکالر وید - اسکریپت‌های اصلی
 * نسخه نهایی با سه بورسیه 
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

function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => preloader.style.display = 'none', 400);
        }, 1200);
    }
}

function initTheme() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;
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

function initMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.mobile-menu');
    if (!btn || !menu) return;
    
    btn.addEventListener('click', () => {
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

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });
}

function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.pageYOffset > 50);
    });
}

function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.pageYOffset > 400);
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initModal() {
    const modal = document.getElementById('scholarshipModal');
    if (!modal) return;
    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function openModal(id) {
    const modal = document.getElementById('scholarshipModal');
    const modalBody = document.getElementById('modalBody');
    if (!modal || !modalBody) return;
    
    const data = {
        // بورسیه عربستان سعودی (فعال)
        ksu: {
            flag: 'https://flagcdn.com/w320/sa.png',
            country: 'عربستان سعودی',
            title: 'بورسیه‌های وزارت تعلیم عربستان',
            deadline: 'به زودی... (تا وقت باز شدن اسنادتان را آماده کنید)',
            levels: 'لیسانس، ماستری، دکتورا',
            fields: 'علوم عصری (مهندسی، کامپیوتر، اقتصاد، علوم پایه) – علوم شرعی (قرآن، حدیث، فقه، عقیده، زبان عربی، حقوق)',
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
                ' شهادتنامه حفظ قرآن یا سایر شهادتنامه‌های معتبر',
                '',
                '❗️ شرط معدل: نمرات سه ساله متقاضی کمتر از ۷۵٪ نباشد.',
                '',
                '✅ پس از قبولی، ارائه این مدارک نیز لازم است:',
                ' فرم صحی + ترجمه عربی',
                ' فرم عدم مسئولیت جرمی + ترجمه عربی'
            ],
            applyUrl: 'https://t.me/Saudi_Scholarships'
        },
        // بورسیه دولتی ترکیه (ختم شده)
        turkey_gov: {
            flag: 'https://flagcdn.com/w320/tr.png',
            country: 'ترکیه',
            title: 'بورسیه رایگان دولتی ترکیه',
            deadline: 'ختم شده (۲۰ فبروری ۲۰۲۶)',
            levels: 'لیسانس، ماستری، دکترا',
            fields: 'تمامی رشته‌ها (به جز پزشکی و مهندسی با شرط معدل بالا)',
            benefits: [
                'بیمه صحی رایگان',
                'لیلیه (اسکان) رایگان',
                'فیس دانشگاه رایگان',
                'تکت رفت و برگشت (یک بار)',
                'معاش ماهیانه: لیسانس ۷۰۰ لیر، ماستری ۸۰۰ لیر، دکترا ۱۴۰۰ لیر'
            ],
            requirements: [
                'شرایط سنی:',
                '✅ لیسانس حداکثر ۲۱ سال',
                '✅ ماستری حداکثر ۳۰ سال',
                '✅ دکترا حداکثر ۳۵ سال',
                '',
                'شرایط حداقل فیصدی نمرات:',
                '✅ لیسانس حداقل ۷۰٪',
                '✅ ماستری و دکترا حداقل ۷۵٪',
                '',
                '📁 اسناد مورد نیاز:',
                '1️⃣ تذکره یا پاسپورت',
                '2️⃣ مدارک تعلیمی (شهادتنامه/دیپلم/نمرات/ترانسکریپت)',
                '3️⃣ دو عدد سفارش‌نامه (توصیه‌نامه) همراه با شماره تماس و ایمیل سفارش‌دهنده',
                '4️⃣ خلص سوانح (CV)',
                '5️⃣ عکس با زمینه سفید',
                '6️⃣ انگیزه‌نامه (برای لیسانس و ماستری به هر زبان، برای دکترا به انگلیسی یا ترکی)',
                '7️⃣ سایر اسناد (تقدیرنامه‌ها، گواهی‌های فعالیت اجتماعی) – اختیاری',
                '',
                '‼️ نکته: متقاضیان رشته طب و انجینیری باید معدل کمتر از ۹۰٪ نباشد.',
                '📌 داشتن مدرک زبان شرط نیست.',
                '⚠️ انگیزه‌نامه مهمترین عنصر پذیرش است.'
            ],
            applyUrl: 'https://t.me/YBAKHTIAR'
        },
        // بورسیه دیانت ترکیه (ختم شده)
        diyanet: {
            flag: 'https://flagcdn.com/w320/tr.png',
            country: 'ترکیه - دیانت',
            title: 'بورسیه رایگان بنیاد دیانت ترکیه',
            deadline: 'ختم شده (۲۸ فبروری ۲۰۲۶)',
            levels: 'لیسه، لیسانس، ماستری، دکترا',
            fields: 'اصول فقه، حفظ قرآن کریم، تفسیر، حدیث شریف، شرعیات، حقوق و علوم سیاسی، تاریخ اسلام، زبان و ادبیات عربی',
            benefits: [
                'ویزه اقامه',
                'تکت رفت و برگشت همه ساله',
                'لیلیه و مسکن (غذا)',
                'جیب خرچی ماهانه',
                'معافیت از پرداخت فیس دانشگاه',
                'دوره زبان ترکی',
                'ترانسپورت و بیمه صحی'
            ],
            requirements: [
                '📁 اسناد مورد نیاز:',
                '✅ پاسپورت (در نبود پاسپورت با تذکره ثبت‌نام کنید)',
                '✅ نمرات صنف‌های (۷-۸-۹) برای دوره لیسه',
                '✅ شهادت‌نامه نمرات سه ساله',
                '✅ دیپلم و نمرات (برای مقاطع بالاتر)',
                '✅ سی وی',
                '✅ انگیزه‌نامه',
                '✅ دو عدد تزکیه (توصیه‌نامه)',
                '✅ عکس پرسونلی',
                '',
                '📌 شرایط ثبت‌نام:',
                '• سن متقاضی لیسه حداکثر ۱۶ سال',
                '• سن متقاضی لیسانس حداکثر ۲۱ سال',
                '• سن متقاضی ماستری حداکثر ۳۰ سال',
                '• سن متقاضی دکترا حداکثر ۳۵ سال',
                '• فیصدی نمرات بالای ۷۰٪',
                '• داشتن صحت کامل',
                '',
                '⚠️ این بورسیه مخصوص دانشجویانی است که از افغانستان پذیرش دارند.'
            ],
            applyUrl: 'https://t.me/YBAKHTIAR'
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
                ارتباط با پشتیبان
            </a>
            <p><i class="fas fa-info-circle"></i> برای راهنمایی و ثبت‌نام، با آیدی تلگرام تماس بگیرید.</p>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('scholarshipModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function initToast() {
    window.showToast = (message, type = 'success') => {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        if (!toast || !toastMessage) return;
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
