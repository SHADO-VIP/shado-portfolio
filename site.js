const projects = {
  flagDay: {
    title: "The Shot We Continue · UAE Flag Day",
    file: "./assets/flag-day.mp4",
    poster: "./assets/flag-day.webp",
    landscape: true
  },
  verifact: {
    title: "VeriFact AI",
    file: "./assets/verifact.mp4",
    problem: "Text, images, and videos can circulate without enough context to assess them.",
    build: "I built a bilingual interface and a Node.js and Express backend that uses Gemini to return structured assessments, confidence scores, evidence summaries, and verification notes.",
    repository: "https://github.com/SHADO-VIP/verifact-ai",
    link: "https://verifact-ai-xhn5.vercel.app/",
    linkText: "Try VeriFact AI"
  },
  newsroom: {
    title: "Future Pressroom AI",
    embed: "https://www.youtube-nocookie.com/embed/MxtuiIOw4XE",
    watch: "https://www.youtube.com/watch?v=MxtuiIOw4XE",
    problem: "Newsrooms need to turn incoming stories into reviewable drafts while maintaining editorial control.",
    build: "I built a newsroom workflow that collects stories, classifies them, supports verification and drafting, and sends the result for human editorial review.",
    repository: "https://github.com/SHADO-VIP/future-pressroom-ai",
    mobileApp: "https://github.com/SHADO-VIP/future-pressroom-app",
    link: "https://www.futurepressroom.com/",
    linkText: "Visit Future Pressroom"
  },
  fikra: {
    title: "FIKRA",
    file: "./assets/fikra.mp4",
    poster: "./assets/fikra.webp",
    problem: "A single campaign idea needs different formats, scripts, and messages for different platforms.",
    build: "I designed an Arabic-first AI skill that gathers the goal and audience, develops a campaign angle, and drafts platform-specific content. It can produce a quick set of posts or a fuller campaign with scripts, visual briefs, and a publishing plan."
  },
  promptDirector: {
    title: "Prompt Director",
    file: "./assets/prompt-director.mp4",
    poster: "./assets/prompt-director.webp",
    landscape: true,
    watch: "https://www.youtube.com/watch?v=BYxaHwBrBW0",
    videoIntro: "See how Prompt Director transforms simple ideas into structured, production-ready AI prompts through a clean and intuitive workflow.",
    problem: "One creative brief often needs several prompts for different production tools.",
    build: "I built a web app that takes an idea, a project type, and an output language, then uses Gemini to generate prompts for scripts, images, video, and voice. Each prompt can be copied directly from the app.",
    repository: "https://github.com/SHADO-VIP/prompt-director",
    link: "https://prompt-director.onrender.com/",
    linkText: "Try Prompt Director"
  },
  report: {
    title: "U.S. Midterms Report",
    file: "./assets/report.mp4",
    problem: "The U.S. midterm results need context about which offices were contested and what the vote means.",
    build: "I developed an Arabic script, produced the narration, and edited footage and graphics into a vertical report."
  },
  gazaWinter: {
    title: "Gaza’s Winter of Cold and Fire",
    file: "./assets/gaza-winter.mp4",
    poster: "./assets/gaza-winter.webp",
    videoIntro: "Music: The Long Dark by Scott Buckley (scottbuckley.com.au), CC BY 4.0."
  },
  elNino: {
    title: "El Niño and the UAE Winter",
    file: "./assets/el-nino.mp4",
    poster: "./assets/el-nino.webp"
  },
  iran: {
    title: "Trump and the War with Iran",
    file: "./assets/iran-report.mp4",
    poster: "./assets/iran-report.webp"
  },
  dreams: {
    title: "Selling the Illusion",
    file: "./assets/dreams-for-sale.mp4",
    poster: "./assets/dreams-for-sale.webp"
  },
  fuelPrices: {
    title: "Why Petrol Prices Don’t Always Follow Oil",
    embed: "https://www.youtube-nocookie.com/embed/kg8aQ6eEwTM",
    watch: "https://www.youtube.com/watch?v=kg8aQ6eEwTM"
  }
};

const dialog = document.querySelector("#viewer");
const title = document.querySelector("#dialog-title");
const content = document.querySelector("#dialog-content");
const closeButton = document.querySelector(".close");
let opener;

function externalLink(url, text, className) {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = text + " ↗";
  if (className) link.className = className;
  return link;
}

function openProject(button) {
  const videoMode = Boolean(button.dataset.video);
  const project = projects[button.dataset.video || button.dataset.case];
  opener = button;
  title.textContent = project.title;
  dialog.classList.toggle("video-dialog", videoMode);
  dialog.classList.toggle("landscape-dialog", videoMode && Boolean(project.landscape));
  content.replaceChildren();

  if (videoMode && project.videoIntro) {
    const intro = document.createElement("p");
    intro.className = "video-intro";
    intro.textContent = project.videoIntro;
    content.append(intro);
  }

  if (videoMode && project.file) {
    const player = document.createElement("video");
    player.src = project.file;
    if (project.poster) player.poster = project.poster;
    player.controls = true;
    player.playsInline = true;
    player.preload = "metadata";
    content.append(player);
    if (project.watch) content.append(externalLink(project.watch, "Watch on YouTube", "player-link"));
    dialog.showModal();
    player.play().catch(() => {});
    return;
  }

  if (videoMode) {
    const player = document.createElement("iframe");
    player.src = project.embed;
    player.title = project.title + " walkthrough";
    player.allow = "encrypted-media; picture-in-picture";
    player.allowFullscreen = true;
    content.append(player, externalLink(project.watch, "Watch on YouTube", "player-link"));
  } else {
    const copy = document.createElement("div");
    copy.className = "case-copy";
    for (const [label, text] of [["The problem", project.problem], ["My role", project.build]]) {
      const paragraph = document.createElement("p");
      const heading = document.createElement("strong");
      heading.textContent = label;
      paragraph.append(heading, document.createElement("br"), text);
      copy.append(paragraph);
    }
    if (project.link) {
      const links = document.createElement("div");
      links.className = "case-links";
      links.append(externalLink(project.link, project.linkText));
      if (project.repository) links.append(externalLink(project.repository, "View on GitHub"));
      if (project.mobileApp) links.append(externalLink(project.mobileApp, "Future Pressroom AI Mobile App"));
      copy.append(links);
    }
    content.append(copy);
  }
  dialog.showModal();
}

document.querySelectorAll("[data-video], [data-case]").forEach((button) => {
  button.addEventListener("click", () => openProject(button));
});

function openLinkedWorkPanel() {
  const panel = document.getElementById(location.hash.slice(1));
  if (panel?.matches("details.work-panel")) panel.open = true;
}

openLinkedWorkPanel();
window.addEventListener("hashchange", openLinkedWorkPanel);
closeButton.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener("close", () => {
  content.replaceChildren();
  opener?.focus();
});

const pointerSupportsHover = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
document.querySelectorAll("[data-cursor]").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (!pointerSupportsHover.matches || event.pointerType !== "mouse") return;
    const rect = card.getBoundingClientRect();
    const x = Math.min(rect.width - 37, Math.max(37, event.clientX - rect.left));
    const y = Math.min(rect.height - 37, Math.max(37, event.clientY - rect.top));
    card.style.setProperty("--x", x + "px");
    card.style.setProperty("--y", y + "px");
    card.classList.add("is-tracking");
  });
  card.addEventListener("pointerleave", () => card.classList.remove("is-tracking"));
});
