const SECTIONS = ["dashboard", "create", "projects", "templates", "affiliate", "settings", "help"];
function showSection(name) {
    SECTIONS.forEach(sec => {
        const el = document.getElementById(`${sec}-section`);
        if (el) {
            el.classList.toggle("hidden", sec !== name);
        }
    });

    document.querySelectorAll(".sidebar-item").forEach(item => {
        const isActive = item.getAttribute("onclick")?.includes(`showSection('${name}')`);
        item.classList.toggle("active", isActive);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    showSection("settings");

    document.querySelectorAll(".tab").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
            document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
            btn.classList.add("active");
            document.getElementById(btn.dataset.tab).classList.add("active");
        });

    });

    const btn = document.getElementById("sidebar-toggle");
    const sidebar = document.getElementById("sidebar");

    btn.addEventListener("click", () => {
        if (sidebar.style.display === "none") {
            sidebar.style.display = "block"; // Hoặc "flex", tùy bạn muốn hiện như thế nào
        } else {
            sidebar.style.display = "none";
        }
    });
});
