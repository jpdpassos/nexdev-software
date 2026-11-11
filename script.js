/* NexDev Software - interações mínimas: menu, ano e WhatsApp */

/* ============================================================
   CONFIGURAÇÃO: substitua pelo número real da NexDev.
   Formato: código do país + DDD + número, somente dígitos.
   Exemplo: 5511999999999
   ============================================================ */
const WHATSAPP_NUMBER = "5511955906678";

const WHATSAPP_GREETING = "Olá, NexDev! Quero conversar sobre um projeto.";

(function () {
  "use strict";

  const buildWhatsAppUrl = (text) =>
    "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);

  // Ano do rodapé
  const year = document.getElementById("ano");
  if (year) year.textContent = new Date().getFullYear();

  // Links do WhatsApp: header, hero, CTA final e botão flutuante
  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.href = buildWhatsAppUrl(WHATSAPP_GREETING);
  });

  // Menu mobile
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("menu");
  if (toggle && menu) {
    const setOpen = (open) => {
      menu.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    };
    toggle.addEventListener("click", () =>
      setOpen(toggle.getAttribute("aria-expanded") !== "true")
    );
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => setOpen(false))
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("open")) {
        setOpen(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 881px)").addEventListener("change", (e) => {
      if (e.matches) setOpen(false);
    });
  }

  // Filtro interativo dos tipos de sites
  const filterTabs = document.querySelectorAll("[data-site-filter]");
  const siteTypeCards = document.querySelectorAll("[data-site-type]");
  const siteTypesResult = document.querySelector("[data-site-types-result]");
  const siteTypesSection = document.querySelector(".site-types-section");
  const siteTypesToggle = document.querySelector("[data-site-types-toggle]");
  const siteTypesToggleLabel = document.querySelector("[data-site-types-toggle-label]");
  const setSiteTypesExpanded = (expanded) => {
    if (!siteTypesSection || !siteTypesToggle) return;
    siteTypesSection.classList.toggle("is-expanded", expanded);
    siteTypesToggle.setAttribute("aria-expanded", String(expanded));
    if (siteTypesToggleLabel) {
      siteTypesToggleLabel.textContent = expanded ? "Ver menos tipos" : "Ver mais tipos";
    }
  };

  if (siteTypesToggle) {
    siteTypesToggle.addEventListener("click", () => {
      setSiteTypesExpanded(siteTypesToggle.getAttribute("aria-expanded") !== "true");
    });
  }

  if (filterTabs.length && siteTypeCards.length) {
    const applySiteFilter = (filter) => {
      let visibleCards = 0;
      if (filter !== "todos") setSiteTypesExpanded(true);
      siteTypeCards.forEach((card) => {
        const shouldShow = filter === "todos" || card.dataset.siteType === filter;
        card.hidden = !shouldShow;
        if (shouldShow) visibleCards += 1;
      });

      filterTabs.forEach((tab) => {
        const isActive = tab.dataset.siteFilter === filter;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-pressed", String(isActive));
      });

      if (siteTypesResult) {
        siteTypesResult.textContent = `${visibleCards} ${visibleCards === 1 ? "tipo de solução" : "tipos de solução"}`;
      }
    };

    filterTabs.forEach((tab) => {
      tab.addEventListener("click", () => applySiteFilter(tab.dataset.siteFilter));
    });
  }

  // Cards com demonstrações: clique no card ou use Enter/Espaço para abrir o exemplo.
  document.querySelectorAll("[data-demo-link]").forEach((card) => {
    const demoLink = card.dataset.demoLink;
    if (!demoLink) return;

    const openDemo = () => window.open(demoLink, "_blank", "noopener,noreferrer");
    card.addEventListener("click", (event) => {
      if (event.target.closest("a, button")) return;
      openDemo();
    });
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openDemo();
    });
  });

})();
