
const projects = [
    {
        id: 1,
        title: "Website Portofolio",
        category: "web",
        categoryName: "Web Development",
        year: "2026",
        image: "https://images.unsplash.com/photo- portfolio",
        description:
            "Website portofolio personal dengan desain modern, responsif, dan interaksi yang intuitif.",
        details:
            "Proyek ini berfokus pada personal branding melalui website yang menampilkan profil, keterampilan, dan hasil karya. Dibangun menggunakan HTML, CSS, dan JavaScript dengan layout responsif.",
        tech: ["HTML", "CSS", "JavaScript"],
        demo: "#",
        source: "#"
    },
    {
        id: 2,
        title: "Sistem Pemesanan Tiket",
        category: "web",
        categoryName: "Web Development",
        year: "2026",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05",
        description:
            "Aplikasi pemesanan tiket dengan pilihan tujuan, kelas perjalanan, dan perhitungan harga.",
        details:
            "Aplikasi ini memungkinkan pengguna memilih tujuan, kelas, jumlah tiket, dan tanggal perjalanan. Sistem menghitung total harga dan menampilkan ringkasan pemesanan.",
        tech: ["HTML", "CSS", "JavaScript"],
        demo: "#",
        source: "#"
    },
    {
        id: 3,
        title: "Portal Akademik",
        category: "web",
        categoryName: "Web Development",
        year: "2026",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
        description:
            "Konsep portal akademik untuk mengelola jadwal, tugas, nilai, dan informasi siswa.",
        details:
            "Portal akademik ini dirancang sebagai antarmuka terpusat untuk informasi sekolah. Proyek dapat dikembangkan lebih lanjut dengan backend dan database.",
        tech: ["HTML", "CSS", "JavaScript"],
        demo: "#",
        source: "#"
    },
    {
        id: 4,
        title: "Simulasi Jaringan",
        category: "network",
        categoryName: "Networking",
        year: "2026",
        image: "https://images.unsplash.com/photo- Network",
        description:
            "Perancangan topologi jaringan dengan konfigurasi IP dan perangkat jaringan.",
        details:
            "Proyek simulasi jaringan mencakup perancangan topologi, pembagian alamat IP, konfigurasi perangkat, dan pengujian konektivitas.",
        tech: ["Cisco Packet Tracer", "TCP/IP", "Routing"],
        demo: "#",
        source: "#"
    },
    {
        id: 5,
        title: "Sistem Lampu Otomatis",
        category: "hardware",
        categoryName: "Hardware",
        year: "2026",
        image: "https://images.unsplash.com/photo-151光",
        description:
            "Prototipe sistem lampu berbasis mikrokontroler dan sensor.",
        details:
            "Proyek ini menggabungkan mikrokontroler, sensor, dan LED untuk mempelajari input, output, serta logika otomatisasi.",
        tech: ["Arduino", "Sensor", "Elektronika"],
        demo: "#",
        source: "#"
    }
];

// Elemen utama
const projectsGrid = document.getElementById("projectsGrid");
const projectSearch = document.getElementById("projectSearch");
const projectFilters = document.getElementById("projectFilters");
const projectCount = document.getElementById("projectCount");

// Modal
const projectModal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTech = document.getElementById("modalTech");
const modalActions = document.getElementById("modalActions");

let activeFilter = "all";

// Render kartu proyek
function renderProjects() {
    const query = projectSearch.value.toLowerCase().trim();

    const filteredProjects = projects.filter(project => {
        const matchesCategory =
            activeFilter === "all" ||
            project.category === activeFilter;

        const searchableText = [
            project.title,
            project.description,
            project.categoryName,
            ...project.tech
        ].join(" ").toLowerCase();

        return matchesCategory && searchableText.includes(query);
    });

    projectCount.textContent = String(projects.length).padStart(2, "0");

    if (filteredProjects.length === 0) {
        projectsGrid.innerHTML = `
            <div class="empty-state">
                Tidak ada proyek yang cocok dengan pencarianmu.
            </div>
        `;
        return;
    }

    projectsGrid.innerHTML = filteredProjects.map(project => `
        <article class="project-card">
            <div class="project-image">
                <img src="${project.image}"
                     alt="${project.title}"
                     loading="lazy"
                     onerror="this.style.display='none'">
                <span class="project-category">
                    ${project.categoryName}
                </span>
            </div>

            <div class="project-content">
                <div class="project-topline">
                    <h3>${project.title}</h3>
                    <span class="project-year">${project.year}</span>
                </div>

                <p>${project.description}</p>

                <div class="tech-list">
                    ${project.tech.map(tech => `
                        <span class="tech-tag">${tech}</span>
                    `).join("")}
                </div>

                <div class="project-footer">
                    <button class="text-link"
                            data-project="${project.id}">
                        Lihat detail ↗
                    </button>
                    <a class="text-link"
                       href="${project.demo}"
                       target="_blank"
                       rel="noopener noreferrer">
                        Live Demo ↗
                    </a>
                </div>
            </div>
        </article>
    `).join("");
}

// Filter kategori
projectFilters.addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");

    if (!button) return;

    activeFilter = button.dataset.filter;

    projectFilters.querySelectorAll(".filter-btn")
        .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");
    renderProjects();
});

// Pencarian
projectSearch.addEventListener("input", renderProjects);

// Buka modal detail
projectsGrid.addEventListener("click", event => {
    const button = event.target.closest("[data-project]");

    if (!button) return;

    const project = projects.find(
        item => item.id === Number(button.dataset.project)
    );

    if (!project) return;

    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalCategory.textContent = project.categoryName;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.details;

    modalTech.innerHTML = project.tech.map(tech => `
        <span class="tech-tag">${tech}</span>
    `).join("");

    modalActions.innerHTML = `
        <a class="btn btn-primary"
           href="${project.demo}"
           target="_blank"
           rel="noopener noreferrer">
            Live Demo ↗
        </a>

        <a class="btn btn-secondary"
           href="${project.source}"
           target="_blank"
           rel="noopener noreferrer">
            Source Code ↗
        </a>
    `;

    projectModal.classList.add("open");
    document.body.classList.add("modal-open");
    modalClose.focus();
});

// Tutup modal
function closeModal() {
    projectModal.classList.remove("open");
    document.body.classList.remove("modal-open");
}

modalClose.addEventListener("click", closeModal);

projectModal.addEventListener("click", event => {
    if (event.target === projectModal) {
        closeModal();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeModal();
    }
});

// Navigasi mobile
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "×" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});

// Animasi scroll
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(element => {
    observer.observe(element);
});

// Tahun otomatis
document.getElementById("year").textContent =
    new Date().getFullYear();

// Jalankan
renderProjects();
