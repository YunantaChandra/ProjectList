document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("project-container");
  const totalStat = document.getElementById("total-projects-stat");

  // --- LOGIKA DARK / LIGHT MODE ---
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeText = document.getElementById("theme-text");

  // Cek simpanan tema sebelumnya di localStorage
  if (localStorage.getItem("theme") === "dark" || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add("dark");
    if (themeText) themeText.textContent = "Mode Terang";
  } else {
    document.documentElement.classList.remove("dark");
    if (themeText) themeText.textContent = "Mode Gelap";
  }

  // Event listener tombol switch mode
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        themeText.textContent = "Mode Gelap";
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        themeText.textContent = "Mode Terang";
      }
    });
  }

  // --- FETCH DATA PROYEK DARI PROJECTS.JSON ---
  fetch("./projects.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Gagal mengambil file JSON");
      }
      return response.json();
    })
    .then((projects) => {
      container.innerHTML = ""; // Bersihkan loading

      // Update angka statistik total proyek
      if (totalStat) {
        totalStat.textContent = projects.length;
      }

      if (projects.length === 0) {
        container.innerHTML = `<p class="col-span-full text-center text-slate-400 py-8">Belum ada proyek yang terdaftar.</p>`;
        return;
      }

      // Render kartu proyek dengan gaya panel ZKTeco
      projects.forEach((proj) => {
        const card = document.createElement("div");
        card.className = "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between";

        card.innerHTML = `
          <div>
            <div class="flex justify-between items-start gap-2 mb-3">
              <h4 class="font-bold text-slate-900 dark:text-white text-base leading-snug">${proj.judul}</h4>
              <span class="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 shrink-0">Aktif</span>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">${proj.deskripsi}</p>
          </div>
          <a href="${proj.link}" target="_blank" rel="noopener noreferrer" 
             class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-3 rounded-lg text-center text-xs flex items-center justify-center gap-2 transition-colors shadow-sm">
            <span>Buka Modul / Proyek</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        `;

        container.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error loading JSON:", error);
      container.innerHTML = `<p class="col-span-full text-center text-rose-500 py-8">Gagal memuat data proyek. Pastikan file projects.json tersedia.</p>`;
    });
});
