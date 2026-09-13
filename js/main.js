/* =========================================================================
   دكتور محمد — Main JS
   ========================================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     إعدادات عامة — رقم واتساب والرسالة الافتراضية
  --------------------------------------------------------------------- */
  var WHATSAPP_NUMBER = '201555227040'; // بصيغة دولية بدون + أو أصفار زائدة
  var WHATSAPP_MESSAGE = 'مرحبًا دكتور محمد، أرغب في حجز موعد بالعيادة.';

  document.addEventListener('DOMContentLoaded', function () {
    initHeaderScroll();
    initMobileNav();
    initWhatsappButtons();
    initFaqAccordion();
    initBookingForm();
    initTrackedClicks();
  });

  /* ---------------------------------------------------------------------
     1) Header: إضافة ظل/خلفية عند التمرير
  --------------------------------------------------------------------- */
  function initHeaderScroll() {
    var header = document.getElementById('siteHeader');
    if (!header) return;
    function onScroll() {
      if (window.scrollY > 8) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------------------------------------------------------------------
     2) قائمة الموبايل (Hamburger Menu)
  --------------------------------------------------------------------- */
  function initMobileNav() {
    var toggle = document.getElementById('navToggle');
    var nav = document.getElementById('mainNav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // إغلاق القائمة عند اختيار رابط
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------------------------------------------------------------------
     3) أزرار واتساب — بناء الرابط تلقائيًا بالرقم والرسالة أعلاه
  --------------------------------------------------------------------- */
  function initWhatsappButtons() {
    var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(WHATSAPP_MESSAGE);
    document.querySelectorAll('.whatsapp-btn').forEach(function (btn) {
      btn.setAttribute('href', url);
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener');
    });
  }

  /* ---------------------------------------------------------------------
     4) الأسئلة الشائعة (FAQ Accordion)
  --------------------------------------------------------------------- */
  function initFaqAccordion() {
    var items = document.querySelectorAll('.faq-item');
    items.forEach(function (item) {
      var question = item.querySelector('.faq-question');
      if (!question) return;
      question.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');
        items.forEach(function (i) {
          i.classList.remove('is-open');
          var q = i.querySelector('.faq-question');
          if (q) q.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('is-open');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ---------------------------------------------------------------------
     5) نموذج حجز الموعد
  --------------------------------------------------------------------- */
  function initBookingForm() {
    var form = document.getElementById('bookingForm');
    var successMsg = document.getElementById('formSuccess');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var data = {
        fullName: form.fullName.value.trim(),
        phone: form.phone.value.trim(),
        preferredDay: form.preferredDay.value,
        preferredTime: form.preferredTime.value,
        notes: form.notes.value.trim()
      };

      /* =====================================================================
         TODO: ربط النموذج بخدمة خارجية (Webhook / CRM / Google Sheets / Email)
         مثال باستخدام fetch إلى Webhook (مثل Zapier أو Make أو API خاص):

         fetch('https://YOUR-WEBHOOK-URL', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(data)
         })
           .then(function (res) { return res.json(); })
           .then(function () { showSuccess(); })
           .catch(function (err) { console.error('Booking submit failed:', err); });

         حاليًا، وبانتظار ربط الـ Webhook، يتم فقط إظهار رسالة نجاح للمستخدم.
      ===================================================================== */

      // ---- Tracking Event: Appointment Form Submit ----
      // مكان إضافة كود التتبع، مثال:
      // gtag('event', 'appointment_form_submit', data);
      // fbq('track', 'Schedule');
      // ttq.track('SubmitForm');

      showSuccess();
      form.reset();
    });

    function showSuccess() {
      if (!successMsg) return;
      successMsg.hidden = false;
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  /* ---------------------------------------------------------------------
     6) تتبع الأحداث المهمة (يُستخدم مع GTM / GA4 / Meta / TikTok / Snapchat)
  --------------------------------------------------------------------- */
  function initTrackedClicks() {
    document.querySelectorAll('[data-track]').forEach(function (el) {
      el.addEventListener('click', function () {
        var eventName = el.getAttribute('data-track');
        // مكان إضافة كود التتبع الفعلي، أمثلة:
        // gtag('event', eventName);
        // fbq('trackCustom', eventName);
        // ttq.track(eventName);
        // snaptr('track', eventName);
        console.log('[tracking]', eventName); // يمكن حذف هذا السطر بعد ربط أدوات التتبع
      });
    });
  }
})();
