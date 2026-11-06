document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("project-container");

  // Fetch file projects.json
  fetch("projects.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Gagal mengambil file JSON");
      }
      return response.json();
    })
    .then((projects) => {
      container.innerHTML = ""; // Bersihkan loading text

      if (projects.length === 0) {
        container.innerHTML = `<p class="col-span-full text-center text-gray-500">Belum ada proyek yang ditambahkan.</p>`;
        return;
      }

      // Render setiap proyek
      projects.forEach((proj) => {
        const card = document.createElement("div");
        card.className = "bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between";

        card.innerHTML = `
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">${proj.judul}</h3>
            <p class="text-sm text-gray-600 mb-6 leading-relaxed">${proj.deskripsi}</p>
          </div>
          <a href="${proj.link}" target="_blank" rel="noopener noreferrer" 
             class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg text-center text-sm flex items-center justify-center gap-2 transition-colors">
            Buka Proyek
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        `;

        container.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error loading JSON:", error);
      container.innerHTML = `<p class="col-span-full text-center text-red-500">Gagal memuat data proyek. Pastikan file projects.json ada.</p>`;
    });
});