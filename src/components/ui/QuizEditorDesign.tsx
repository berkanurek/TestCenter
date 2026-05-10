<!-- Quiz Builder - Editor -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Untitled Quiz Editor</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-tertiary": "#ffffff",
                        "on-surface-variant": "#49473f",
                        "surface-tint": "#615e57",
                        "error-container": "#ffdad6",
                        "on-secondary": "#ffffff",
                        "background": "#f9f9f9",
                        "on-tertiary-container": "#9c9d9e",
                        "surface-container-lowest": "#ffffff",
                        "on-error-container": "#93000a",
                        "primary": "#21201a",
                        "surface": "#f9f9f9",
                        "primary-fixed": "#e7e2d9",
                        "tertiary-container": "#333535",
                        "primary-container": "#37352f",
                        "on-tertiary-fixed": "#1a1c1c",
                        "inverse-on-surface": "#f1f1f1",
                        "on-secondary-container": "#5f6161",
                        "outline": "#7a776e",
                        "error": "#ba1a1a",
                        "surface-variant": "#e2e2e2",
                        "surface-container-low": "#f4f3f3",
                        "on-surface": "#1a1c1c",
                        "on-tertiary-fixed-variant": "#454747",
                        "inverse-primary": "#cbc6bd",
                        "surface-bright": "#f9f9f9",
                        "primary-fixed-dim": "#cbc6bd",
                        "surface-container": "#eeeeee",
                        "on-primary-container": "#a19d95",
                        "on-secondary-fixed": "#1a1c1c",
                        "on-background": "#1a1c1c",
                        "inverse-surface": "#2f3131",
                        "on-error": "#ffffff",
                        "outline-variant": "#cbc6bc",
                        "on-secondary-fixed-variant": "#454747",
                        "secondary-fixed-dim": "#c6c6c7",
                        "secondary": "#5d5f5f",
                        "surface-container-high": "#e8e8e8",
                        "surface-container-highest": "#e2e2e2",
                        "on-primary-fixed": "#1d1c16",
                        "on-primary-fixed-variant": "#494740",
                        "tertiary-fixed-dim": "#c6c6c7",
                        "tertiary": "#1e2020",
                        "secondary-container": "#dcdddd",
                        "surface-dim": "#dadada",
                        "on-primary": "#ffffff",
                        "secondary-fixed": "#e2e2e2",
                        "tertiary-fixed": "#e2e2e2"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "spacing": {
                        "xl": "40px",
                        "container-max": "900px",
                        "gutter": "24px",
                        "sm": "8px",
                        "unit": "4px",
                        "xxl": "64px",
                        "xs": "4px",
                        "lg": "24px",
                        "md": "16px"
                    },
                    "fontFamily": {
                        "label-sm": ["Inter"],
                        "caption": ["Inter"],
                        "body-md": ["Inter"],
                        "headline-lg": ["Inter"],
                        "label-md": ["Inter"],
                        "headline-sm": ["Inter"],
                        "headline-md": ["Inter"],
                        "headline-xl": ["Inter"],
                        "body-lg": ["Inter"]
                    },
                    "fontSize": {
                        "label-sm": ["12px", {"lineHeight": "1.4", "letterSpacing": "0.03em", "fontWeight": "500"}],
                        "caption": ["12px", {"lineHeight": "1.4", "fontWeight": "400"}],
                        "body-md": ["15px", {"lineHeight": "1.6", "fontWeight": "400"}],
                        "headline-lg": ["30px", {"lineHeight": "1.3", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                        "label-md": ["14px", {"lineHeight": "1.4", "fontWeight": "500"}],
                        "headline-sm": ["20px", {"lineHeight": "1.4", "fontWeight": "600"}],
                        "headline-md": ["24px", {"lineHeight": "1.4", "fontWeight": "600"}],
                        "headline-xl": ["40px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                        "body-lg": ["17px", {"lineHeight": "1.6", "fontWeight": "400"}]
                    }
                },
            },
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
        }
        input:focus, textarea:focus {
            outline: none;
        }
        .invisible-input {
            background: transparent;
            border: none;
            padding: 0;
            width: 100%;
        }
        .invisible-input:focus {
            border-bottom: 1px solid #EBEBEB;
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #EBEBEB;
            border-radius: 2px;
        }
    </style>
</head>
<body class="bg-surface font-body-md text-on-surface selection:bg-primary-fixed">
<!-- TopAppBar -->
<header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-lg py-sm max-w-none bg-surface border-b border-outline-variant">
<div class="flex items-center gap-md">
<input class="font-headline-sm text-headline-sm font-semibold text-primary invisible-input w-auto min-w-[200px]" spellcheck="false" type="text" value="Untitled Quiz"/>
</div>
<div class="flex items-center gap-sm">
<button class="bg-surface-container-low hover:bg-surface-container-high transition-colors duration-200 px-md py-sm rounded-lg flex items-center gap-xs text-on-surface-variant font-label-md text-label-md">
<span class="material-symbols-outlined" data-icon="download">download</span>
                Download
            </button>
<button class="bg-primary-container text-on-tertiary px-lg py-sm rounded-lg font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all">
                Publish
            </button>
<div class="h-6 w-[1px] bg-outline-variant mx-xs"></div>
<button class="p-sm hover:bg-surface-container-low rounded-lg transition-colors duration-200">
<span class="material-symbols-outlined text-on-surface-variant" data-icon="settings">settings</span>
</button>
<button class="p-sm hover:bg-surface-container-low rounded-lg transition-colors duration-200">
<span class="material-symbols-outlined text-on-surface-variant" data-icon="more_vert">more_vert</span>
</button>
</div>
</header>
<!-- SideNavBar (Right-docked) -->
<aside class="fixed right-0 top-16 h-[calc(100vh-64px)] z-40 flex flex-col p-lg bg-surface-container-low border-l border-outline-variant w-80">
<div class="mb-xl">
<h2 class="font-headline-sm text-headline-sm font-bold text-primary mb-xs">Settings</h2>
<p class="text-secondary font-body-md text-body-md opacity-70">Global Configurations</p>
</div>
<nav class="flex flex-col gap-unit">
<a class="flex items-center gap-md py-sm px-md rounded-lg text-primary font-bold border-l-2 border-primary pl-md bg-surface-container-high transition-all" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span class="font-label-md text-label-md">General</span>
</a>
<a class="flex items-center gap-md py-sm px-md rounded-lg text-secondary font-medium pl-md hover:bg-surface-container-high transition-all" href="#">
<span class="material-symbols-outlined" data-icon="timer">timer</span>
<span class="font-label-md text-label-md">Timing</span>
</a>
<a class="flex items-center gap-md py-sm px-md rounded-lg text-secondary font-medium pl-md hover:bg-surface-container-high transition-all" href="#">
<span class="material-symbols-outlined" data-icon="grade">grade</span>
<span class="font-label-md text-label-md">Grading</span>
</a>
<a class="flex items-center gap-md py-sm px-md rounded-lg text-secondary font-medium pl-md hover:bg-surface-container-high transition-all" href="#">
<span class="material-symbols-outlined" data-icon="lock">lock</span>
<span class="font-label-md text-label-md">Access</span>
</a>
</nav>
<div class="mt-auto">
<button class="w-full bg-primary text-on-tertiary py-md rounded-lg font-label-md text-label-md hover:opacity-90 active:translate-x-1 transition-all">
                Save Changes
            </button>
</div>
</aside>
<!-- Main Content Canvas -->
<main class="pt-xxl pb-xxl pr-[320px] flex flex-col items-center min-h-screen">
<div class="w-full max-w-container-max px-gutter mt-xxl">
<!-- Question List Stack -->
<div class="flex flex-col gap-xl">
<!-- Question 1: Multiple Choice -->
<article class="p-xl bg-surface border border-outline-variant rounded-xl group transition-all hover:border-outline">
<div class="flex justify-between items-start mb-lg">
<div class="flex items-center gap-sm text-on-surface-variant">
<span class="material-symbols-outlined" data-icon="drag_indicator">drag_indicator</span>
<span class="font-label-sm text-label-sm uppercase tracking-wider">Question 1</span>
</div>
<div class="relative">
<button class="flex items-center gap-xs px-sm py-xs border border-outline-variant rounded bg-surface-container-low text-on-surface font-label-md text-label-md">
<span class="material-symbols-outlined text-[18px]" data-icon="list">list</span>
                                Multiple Choice
                                <span class="material-symbols-outlined text-[18px]" data-icon="expand_more">expand_more</span>
</button>
</div>
</div>
<div class="mb-xl">
<input class="font-headline-md text-headline-md text-on-surface invisible-input py-sm focus:border-b-primary transition-all" placeholder="What is the capital of France?" spellcheck="false" type="text"/>
</div>
<div class="flex flex-col gap-md">
<!-- Option A -->
<div class="flex items-center gap-md group/option">
<div class="w-4 h-4 border border-outline-variant rounded-full flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
<div class="w-2 h-2 bg-primary rounded-full opacity-100"></div>
</div>
<input class="font-body-lg text-body-lg invisible-input py-xs border-b border-transparent focus:border-outline-variant" spellcheck="false" type="text" value="Paris"/>
<button class="opacity-0 group-hover/option:opacity-100 transition-opacity">
<span class="material-symbols-outlined text-on-surface-variant" data-icon="close">close</span>
</button>
</div>
<!-- Option B -->
<div class="flex items-center gap-md group/option">
<div class="w-4 h-4 border border-outline-variant rounded-full flex items-center justify-center cursor-pointer hover:border-primary transition-colors"></div>
<input class="font-body-lg text-body-lg invisible-input py-xs border-b border-transparent focus:border-outline-variant" spellcheck="false" type="text" value="London"/>
<button class="opacity-0 group-hover/option:opacity-100 transition-opacity">
<span class="material-symbols-outlined text-on-surface-variant" data-icon="close">close</span>
</button>
</div>
<!-- Option C -->
<div class="flex items-center gap-md group/option">
<div class="w-4 h-4 border border-outline-variant rounded-full flex items-center justify-center cursor-pointer hover:border-primary transition-colors"></div>
<input class="font-body-lg text-body-lg invisible-input py-xs border-b border-transparent focus:border-outline-variant" spellcheck="false" type="text" value="Berlin"/>
<button class="opacity-0 group-hover/option:opacity-100 transition-opacity">
<span class="material-symbols-outlined text-on-surface-variant" data-icon="close">close</span>
</button>
</div>
<!-- Add Option Button -->
<button class="flex items-center gap-sm text-secondary font-label-md text-label-md mt-sm hover:text-primary transition-colors">
<span class="material-symbols-outlined text-[20px]" data-icon="add">add</span>
                            Add option
                        </button>
</div>
</article>
<!-- Question 2: Open-ended -->
<article class="p-xl bg-surface border border-outline-variant rounded-xl group transition-all hover:border-outline">
<div class="flex justify-between items-start mb-lg">
<div class="flex items-center gap-sm text-on-surface-variant">
<span class="material-symbols-outlined" data-icon="drag_indicator">drag_indicator</span>
<span class="font-label-sm text-label-sm uppercase tracking-wider">Question 2</span>
</div>
<div>
<button class="flex items-center gap-xs px-sm py-xs border border-outline-variant rounded bg-surface-container-low text-on-surface font-label-md text-label-md">
<span class="material-symbols-outlined text-[18px]" data-icon="subject">subject</span>
                                Open-ended
                                <span class="material-symbols-outlined text-[18px]" data-icon="expand_more">expand_more</span>
</button>
</div>
</div>
<div class="mb-lg">
<input class="font-headline-md text-headline-md text-on-surface invisible-input py-sm focus:border-b-primary transition-all" placeholder="Explain the process of photosynthesis." spellcheck="false" type="text"/>
</div>
<div class="w-full">
<div class="p-lg bg-surface-container-low border border-dashed border-outline-variant rounded-lg min-h-[120px] text-secondary font-body-md opacity-50 flex items-center justify-center italic">
                            Answer field (User input area)
                        </div>
</div>
<div class="mt-lg flex justify-end">
<div class="flex gap-sm">
<button class="p-xs hover:bg-surface-container-high rounded transition-colors"><span class="material-symbols-outlined text-on-surface-variant" data-icon="content_copy">content_copy</span></button>
<button class="p-xs hover:bg-surface-container-high rounded transition-colors"><span class="material-symbols-outlined text-on-surface-variant" data-icon="delete">delete</span></button>
</div>
</div>
</article>
<!-- Add Question Trigger -->
<button class="group w-full py-xxl border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center gap-md hover:border-primary hover:bg-surface-container-low transition-all duration-200">
<div class="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors">
<span class="material-symbols-outlined text-secondary group-hover:text-white" data-icon="add">add</span>
</div>
<span class="font-label-md text-label-md text-secondary group-hover:text-primary">Add Question</span>
</button>
</div>
<!-- Footer Meta -->
<div class="mt-xxl pt-xl border-t border-outline-variant flex justify-between text-on-surface-variant font-label-sm text-label-sm opacity-60">
<p>Last edited 2 minutes ago</p>
<p>2 Questions • 10 Points</p>
</div>
</div>
</main>
<!-- Contextual FAB (Suppressed on settings/details but shown here for rapid add) -->
<button class="fixed bottom-lg right-[340px] w-14 h-14 bg-primary text-on-tertiary rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40">
<span class="material-symbols-outlined" data-icon="magic_button" style="font-variation-settings: 'FILL' 1;">magic_button</span>
</button>
</body></html>

<!-- Design System -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "background": "#f9f9f9",
                    "tertiary-fixed-dim": "#c6c6c7",
                    "surface-container-high": "#e8e8e8",
                    "on-surface-variant": "#49473f",
                    "on-primary-fixed": "#1d1c16",
                    "surface-container-lowest": "#ffffff",
                    "surface-container-low": "#f4f3f3",
                    "surface-tint": "#615e57",
                    "surface-container": "#eeeeee",
                    "on-surface": "#1a1c1c",
                    "secondary-fixed": "#e2e2e2",
                    "on-tertiary-fixed": "#1a1c1c",
                    "on-error": "#ffffff",
                    "on-primary-container": "#a19d95",
                    "secondary-fixed-dim": "#c6c6c7",
                    "tertiary": "#1e2020",
                    "surface-bright": "#f9f9f9",
                    "outline": "#7a776e",
                    "secondary": "#5d5f5f",
                    "secondary-container": "#dcdddd",
                    "on-secondary-fixed-variant": "#454747",
                    "inverse-on-surface": "#f1f1f1",
                    "on-error-container": "#93000a",
                    "inverse-primary": "#cbc6bd",
                    "tertiary-fixed": "#e2e2e2",
                    "on-tertiary-fixed-variant": "#454747",
                    "on-primary": "#ffffff",
                    "outline-variant": "#cbc6bc",
                    "tertiary-container": "#333535",
                    "primary-fixed-dim": "#cbc6bd",
                    "on-background": "#1a1c1c",
                    "on-secondary-fixed": "#1a1c1c",
                    "inverse-surface": "#2f3131",
                    "primary-fixed": "#e7e2d9",
                    "on-secondary-container": "#5f6161",
                    "surface-dim": "#dadada",
                    "primary-container": "#37352f",
                    "error": "#ba1a1a",
                    "surface": "#f9f9f9",
                    "on-secondary": "#ffffff",
                    "surface-variant": "#e2e2e2",
                    "on-tertiary": "#ffffff",
                    "error-container": "#ffdad6",
                    "on-tertiary-container": "#9c9d9e",
                    "surface-container-highest": "#e2e2e2",
                    "primary": "#21201a",
                    "on-primary-fixed-variant": "#494740"
            },
            "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "0.75rem"
            },
            "spacing": {
                    "xxl": "64px",
                    "xs": "4px",
                    "md": "16px",
                    "gutter": "24px",
                    "xl": "40px",
                    "lg": "24px",
                    "unit": "4px",
                    "container-max": "900px",
                    "sm": "8px"
            },
            "fontFamily": {
                    "label-md": ["Inter"],
                    "headline-lg": ["Inter"],
                    "label-sm": ["Inter"],
                    "body-lg": ["Inter"],
                    "body-md": ["Inter"],
                    "caption": ["Inter"],
                    "headline-xl": ["Inter"],
                    "headline-sm": ["Inter"],
                    "headline-md": ["Inter"]
            },
            "fontSize": {
                    "label-md": ["14px", {"lineHeight": "1.4", "fontWeight": "500"}],
                    "headline-lg": ["30px", {"lineHeight": "1.3", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                    "label-sm": ["12px", {"lineHeight": "1.4", "letterSpacing": "0.03em", "fontWeight": "500"}],
                    "body-lg": ["17px", {"lineHeight": "1.6", "fontWeight": "400"}],
                    "body-md": ["15px", {"lineHeight": "1.6", "fontWeight": "400"}],
                    "caption": ["12px", {"lineHeight": "1.4", "fontWeight": "400"}],
                    "headline-xl": ["40px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                    "headline-sm": ["20px", {"lineHeight": "1.4", "fontWeight": "600"}],
                    "headline-md": ["24px", {"lineHeight": "1.4", "fontWeight": "600"}]
            }
          },
        },
      }
    </script>
<style>
        body {
            background-color: #FFFFFF;
            color: #37352F;
            -webkit-font-smoothing: antialiased;
        }
        .border-subtle {
            border: 1px solid #EBEBEB;
        }
        .canvas-centered {
            max-width: 900px;
            margin-left: auto;
            margin-right: auto;
        }
    </style>
</head>
<body class="bg-surface-container-lowest font-body-md text-on-surface">
<!-- TopNavBar -->
<header class="bg-surface dark:bg-surface-container border-b border-outline-variant dark:border-outline docked full-width top-0 sticky z-50">
<nav class="flex justify-between items-center w-full px-xxl max-w-[900px] mx-auto h-16">
<div class="text-headline-sm font-headline-sm font-bold text-primary dark:text-primary-fixed">
                Untitled Quiz
            </div>
<div class="hidden md:flex items-center gap-xl">
<a class="text-secondary dark:text-on-surface-variant text-body-md font-body-md hover:bg-surface-container-low dark:hover:bg-surface-container-high px-sm py-xs transition-all duration-150 rounded" href="#">Features</a>
<a class="text-secondary dark:text-on-surface-variant text-body-md font-body-md hover:bg-surface-container-low dark:hover:bg-surface-container-high px-sm py-xs transition-all duration-150 rounded" href="#">Pricing</a>
</div>
<div class="flex items-center gap-md">
<button class="text-secondary dark:text-on-surface-variant text-body-md font-body-md hover:bg-surface-container-low dark:hover:bg-surface-container-high px-md py-sm rounded transition-all duration-150 active:scale-95">Log in</button>
<button class="bg-primary-container text-on-primary font-body-md px-md py-sm rounded active:scale-95 transition-all duration-150">Sign up</button>
</div>
</nav>
</header>
<main>
<!-- Hero Section -->
<section class="py-xxl px-xxl canvas-centered text-center">
<div class="flex flex-col items-center gap-lg">
<h1 class="text-headline-xl font-headline-xl text-primary max-w-[600px]">
                    Create Tests Effortlessly
                </h1>
<p class="text-body-lg font-body-lg text-secondary max-w-[600px]">
                    A high-performance workspace designed for clarity. Build complex assessments, distribute them securely, and analyze results with systematic precision.
                </p>
<div class="mt-lg">
<button class="bg-primary-container text-on-primary px-xl py-md font-label-md text-label-md rounded active:scale-95 transition-all duration-150">
                        Start Creating for Free
                    </button>
</div>
</div>
</section>
<!-- Visual Anchor (Hero Image Replacement) -->
<section class="px-xxl canvas-centered mb-xxl">
<div class="w-full aspect-video border-subtle bg-surface-container-low rounded-xl overflow-hidden">
<img class="w-full h-full object-cover grayscale-[0.5] opacity-90" data-alt="A clean, high-angle view of a minimalist workspace featuring a sleek laptop on a white desk surrounded by structured journals and a single black pen. The lighting is diffused and bright, reflecting a light-mode aesthetic with high-key whites and subtle grey tones. The composition is orderly and calm, emphasizing the digital essentialism philosophy with a professional, intellectual atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp9Ym7pSB-vmj4ZLGFMC06f7UnX6wPVpNUAeOZktSDGxBp8Y4NjOdecRdD_m7olvehKSrzkXv8l8KncvphaF5gQoFNeD9Ea8IyNyd69tktVIRmdeOSaNiCjewsr3IA5CGdCvY8wIhtcQZ8GyJu0oCNYoSvh-s2rC946BIR3j45w9DMdIdSaRh4sy-xzfpGU41Oye0JhnHbwfIL7ISXIywikNY_yjOHEtsXHOPpigdMfSeUP0eM5PFaxcTc0OUZ2wV7DGEwnBMOS41m"/>
</div>
</section>
<!-- Features Section -->
<section class="px-xxl py-xxl canvas-centered">
<div class="grid grid-cols-1 md:grid-cols-3 gap-lg">
<!-- Card 1 -->
<div class="border-subtle p-lg flex flex-col gap-md transition-colors hover:bg-surface-container-low">
<div class="flex items-center justify-center w-10 h-10 rounded bg-surface-container">
<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 0;">edit_note</span>
</div>
<h3 class="text-headline-sm font-headline-sm text-primary">Intuitive Editor</h3>
<p class="text-body-md font-body-md text-on-surface-variant">
                        Our markdown-inspired editor stays out of your way, letting you focus entirely on the content of your questions.
                    </p>
</div>
<!-- Card 2 -->
<div class="border-subtle p-lg flex flex-col gap-md transition-colors hover:bg-surface-container-low">
<div class="flex items-center justify-center w-10 h-10 rounded bg-surface-container">
<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 0;">analytics</span>
</div>
<h3 class="text-headline-sm font-headline-sm text-primary">Clear Analytics</h3>
<p class="text-body-md font-body-md text-on-surface-variant">
                        Visualize candidate performance with high-density data visualizations that strip away the noise and reveal truth.
                    </p>
</div>
<!-- Card 3 -->
<div class="border-subtle p-lg flex flex-col gap-md transition-colors hover:bg-surface-container-low">
<div class="flex items-center justify-center w-10 h-10 rounded bg-surface-container">
<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 0;">verified_user</span>
</div>
<h3 class="text-headline-sm font-headline-sm text-primary">Secure Delivery</h3>
<p class="text-body-md font-body-md text-on-surface-variant">
                        Ensure the integrity of your tests with robust access controls and time-limited session management.
                    </p>
</div>
</div>
</section>
<!-- Aesthetic Bento Break -->
<section class="px-xxl py-xxl canvas-centered">
<div class="grid grid-cols-1 md:grid-cols-12 gap-gutter h-auto md:h-[400px]">
<div class="md:col-span-8 border-subtle p-xxl flex flex-col justify-end bg-surface-container-lowest">
<h4 class="text-headline-md font-headline-md mb-md text-primary">Engineered for Thinking.</h4>
<p class="text-body-md font-body-md text-on-surface-variant max-w-[400px]">
                        The interface is an extension of your thought process. No clutter, no distractions, just pure productivity.
                    </p>
</div>
<div class="md:col-span-4 border-subtle bg-surface-container-low flex items-center justify-center p-lg relative overflow-hidden">
<img class="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-20" data-alt="A close-up shot of a modern tablet display showing a clean digital dashboard with minimalist line graphs and neat typography. The device is held by hands against a neutral, soft grey background. The lighting is crisp and cool, accentuating the sharp edges and professional aesthetic of the software interface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0pOuP0cXIBdWtTnGwN5EcXM3pLr0ZU3pOlRB7cQiaSnbrM4jpGvpjQX8SnWgXd8OsZzOp5rRE6HJ6Okh1SL-elspecRuMKMchIm3smJIItj-S8RA3vX2k-o-BWxMj7FMNY15MooCK-7YamDYhUcc3Lo12cJgnEfDCtvQvPrjnyg9PATOlCHsNAsR4U8zExwG1YJKXKCA7WsFHlG6_7dVnJ4jeX_aRoA4GD4tWIewcE9sdOdSNbwsA0caRIK0C_jk_9gPUQk6IaX97"/>
<span class="material-symbols-outlined text-[64px] text-primary opacity-20">grid_view</span>
</div>
</div>
</section>
</main>
<!-- Footer -->
<footer class="bg-surface dark:bg-surface-container border-t border-outline-variant dark:border-outline docked full-width bottom mt-xxl">
<div class="flex flex-col md:flex-row justify-between items-center w-full px-xxl py-xl max-w-[900px] mx-auto gap-md">
<div class="text-label-md font-label-md font-bold text-primary dark:text-primary-fixed">
                Untitled Quiz
            </div>
<div class="flex gap-lg">
<a class="text-secondary dark:text-on-surface-variant text-label-sm font-label-sm hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#">Terms</a>
<a class="text-secondary dark:text-on-surface-variant text-label-sm font-label-sm hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#">Privacy</a>
<a class="text-secondary dark:text-on-surface-variant text-label-sm font-label-sm hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#">Contact</a>
</div>
<div class="text-secondary dark:text-on-surface-variant text-label-sm font-label-sm">
                © 2024 Untitled Quiz. Built for clarity.
            </div>
</div>
</footer>
</body></html>

<!-- Untitled Quiz - Landing Page -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "secondary-fixed": "#e2e2e2",
                    "on-secondary-fixed": "#1a1c1c",
                    "inverse-surface": "#2f3131",
                    "surface-container-highest": "#e2e2e2",
                    "outline": "#7a776e",
                    "surface-container": "#eeeeee",
                    "primary-fixed": "#e7e2d9",
                    "primary-container": "#37352f",
                    "primary": "#21201a",
                    "outline-variant": "#cbc6bc",
                    "on-secondary-container": "#5f6161",
                    "error-container": "#ffdad6",
                    "tertiary-fixed": "#e2e2e2",
                    "surface-bright": "#f9f9f9",
                    "on-primary-fixed": "#1d1c16",
                    "on-background": "#1a1c1c",
                    "on-surface-variant": "#49473f",
                    "on-error": "#ffffff",
                    "on-tertiary-container": "#9c9d9e",
                    "background": "#f9f9f9",
                    "error": "#ba1a1a",
                    "on-tertiary-fixed": "#1a1c1c",
                    "primary-fixed-dim": "#cbc6bd",
                    "on-primary": "#ffffff",
                    "inverse-primary": "#cbc6bd",
                    "tertiary-fixed-dim": "#c6c6c7",
                    "surface-dim": "#dadada",
                    "on-primary-fixed-variant": "#494740",
                    "inverse-on-surface": "#f1f1f1",
                    "tertiary-container": "#333535",
                    "on-surface": "#1a1c1c",
                    "surface-container-high": "#e8e8e8",
                    "surface-variant": "#e2e2e2",
                    "on-tertiary-fixed-variant": "#454747",
                    "on-primary-container": "#a19d95",
                    "surface-tint": "#615e57",
                    "surface-container-lowest": "#ffffff",
                    "secondary-fixed-dim": "#c6c6c7",
                    "on-tertiary": "#ffffff",
                    "tertiary": "#1e2020",
                    "surface": "#f9f9f9",
                    "secondary-container": "#dcdddd",
                    "secondary": "#5d5f5f",
                    "on-secondary": "#ffffff",
                    "on-secondary-fixed-variant": "#454747",
                    "on-error-container": "#93000a",
                    "surface-container-low": "#f4f3f3"
            },
            "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "0.75rem"
            },
            "spacing": {
                    "xl": "40px",
                    "unit": "4px",
                    "lg": "24px",
                    "container-max": "900px",
                    "xs": "4px",
                    "md": "16px",
                    "xxl": "64px",
                    "gutter": "24px",
                    "sm": "8px"
            },
            "fontFamily": {
                    "headline-lg": ["Inter"],
                    "label-md": ["Inter"],
                    "caption": ["Inter"],
                    "body-md": ["Inter"],
                    "headline-xl": ["Inter"],
                    "headline-sm": ["Inter"],
                    "body-lg": ["Inter"],
                    "label-sm": ["Inter"],
                    "headline-md": ["Inter"]
            },
            "fontSize": {
                    "headline-lg": ["30px", {"lineHeight": "1.3", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                    "label-md": ["14px", {"lineHeight": "1.4", "fontWeight": "500"}],
                    "caption": ["12px", {"lineHeight": "1.4", "fontWeight": "400"}],
                    "body-md": ["15px", {"lineHeight": "1.6", "fontWeight": "400"}],
                    "headline-xl": ["40px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                    "headline-sm": ["20px", {"lineHeight": "1.4", "fontWeight": "600"}],
                    "body-lg": ["17px", {"lineHeight": "1.6", "fontWeight": "400"}],
                    "label-sm": ["12px", {"lineHeight": "1.4", "letterSpacing": "0.03em", "fontWeight": "500"}],
                    "headline-md": ["24px", {"lineHeight": "1.4", "fontWeight": "600"}]
            }
          },
        },
      }
    </script>
<style>
        body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
</head>
<body class="bg-surface-container-lowest text-on-surface">
<div class="flex min-h-screen">
<!-- Side Navigation Shell -->
<aside class="fixed left-0 top-0 h-full w-64 bg-surface-container-low border-r border-outline-variant flex flex-col py-lg">
<!-- Profile Snippet -->
<div class="px-md mb-xl">
<div class="flex items-center gap-md">
<img alt="Alex Rivers" class="w-10 h-10 rounded-lg object-cover" data-alt="A professional headshot of a person with a friendly expression, captured in soft, natural morning light. The background is a clean, minimalist studio setting with neutral grey tones. The photography style is high-end and corporate, emphasizing a monochrome aesthetic with deep contrast and sharp focus on the subject's features." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1YHk3Zu1yhzjKMWQ12j07GHt5SdroOZ3LOTypJyXDqBgsz0wJg7G7HkXOH0hhyj_RatFkAu0JIZBba-EmtPlZA5NpPJsrjMcCDG6qPuyPZvDlfddukdkRctpRaV9EoGX4P63-oGTaucbTshuXAzArZPQmVFMZGzi2en0etWgmsprJd1GZdXtLza_dcoIg-SNAk6EevAwN7DT0_ijARjxRl2R_IGFbH93M8jF2eSh2KNiG1QPda9dQfiZmLdhwDrqvIDu2mdV5mxDt"/>
<div>
<p class="font-headline-sm text-headline-sm text-primary">Alex Rivers</p>
<p class="font-label-sm text-label-sm text-on-surface-variant">Quiz Master</p>
</div>
</div>
</div>
<!-- Navigation Links -->
<nav class="flex-grow space-y-unit">
<a class="flex items-center gap-md border-l-2 border-primary bg-surface-variant text-primary font-bold px-md py-sm transition-all duration-200" href="#">
<span class="material-symbols-outlined" data-icon="quiz">quiz</span>
<span class="font-body-md text-body-md">My Quizzes</span>
</a>
<a class="flex items-center gap-md text-on-surface-variant px-md py-sm hover:bg-surface-container transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="assignment_turned_in">assignment_turned_in</span>
<span class="font-body-md text-body-md">Submissions</span>
</a>
<a class="flex items-center gap-md text-on-surface-variant px-md py-sm hover:bg-surface-container transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="analytics">analytics</span>
<span class="font-body-md text-body-md">Analytics</span>
</a>
<a class="flex items-center gap-md text-on-surface-variant px-md py-sm hover:bg-surface-container transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span class="font-body-md text-body-md">Settings</span>
</a>
</nav>
<!-- Footer Navigation -->
<div class="mt-auto border-t border-outline-variant pt-md">
<a class="flex items-center gap-md text-on-surface-variant px-md py-sm hover:bg-surface-container transition-colors mb-md" href="#">
<span class="material-symbols-outlined" data-icon="help">help</span>
<span class="font-body-md text-body-md">Help Center</span>
</a>
<a class="flex items-center gap-md text-on-surface-variant px-md py-sm hover:bg-surface-container transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="logout">logout</span>
<span class="font-body-md text-body-md">Log Out</span>
</a>
</div>
</aside>
<!-- Main Content Area (The Canvas) -->
<main class="ml-64 flex-grow p-xxl max-w-screen-2xl">
<!-- Top App Bar / Canvas Header -->
<header class="flex justify-between items-center mb-xl">
<div>
<h1 class="font-headline-lg text-headline-lg text-primary">My Quizzes</h1>
<p class="font-body-md text-body-md text-on-surface-variant">Manage and track your active quiz sessions.</p>
</div>
<div class="flex items-center gap-md">
<button class="p-sm text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button class="bg-primary-container text-on-primary font-label-md text-label-md px-lg py-sm rounded-lg hover:opacity-90 transition-opacity">
                        Create New Quiz
                    </button>
</div>
</header>
<!-- Bento Grid of Content -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
<!-- Quiz Card 1 -->
<div class="group border border-outline-variant rounded-lg p-lg hover:bg-surface-container-low transition-all duration-200">
<div class="flex justify-between items-start mb-md">
<span class="material-symbols-outlined text-primary bg-surface-variant p-sm rounded-lg" data-icon="psychology">psychology</span>
<button class="text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</div>
<h3 class="font-label-md text-label-md font-bold text-primary mb-xs">Advanced Typography Systems</h3>
<p class="font-caption text-caption text-outline mb-lg">Created Oct 12, 2023</p>
<div class="flex items-center justify-between mt-auto">
<div class="flex items-center gap-xs text-on-surface-variant">
<span class="material-symbols-outlined text-[18px]" data-icon="list_alt">list_alt</span>
<span class="font-caption text-caption">24 Questions</span>
</div>
<button class="text-primary font-label-sm text-label-sm px-md py-xs rounded hover:bg-surface-variant transition-colors">Edit</button>
</div>
</div>
<!-- Quiz Card 2 -->
<div class="group border border-outline-variant rounded-lg p-lg hover:bg-surface-container-low transition-all duration-200">
<div class="flex justify-between items-start mb-md">
<span class="material-symbols-outlined text-primary bg-surface-variant p-sm rounded-lg" data-icon="architecture">architecture</span>
<button class="text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</div>
<h3 class="font-label-md text-label-md font-bold text-primary mb-xs">Modernist Design Theory</h3>
<p class="font-caption text-caption text-outline mb-lg">Created Oct 08, 2023</p>
<div class="flex items-center justify-between mt-auto">
<div class="flex items-center gap-xs text-on-surface-variant">
<span class="material-symbols-outlined text-[18px]" data-icon="list_alt">list_alt</span>
<span class="font-caption text-caption">18 Questions</span>
</div>
<button class="text-primary font-label-sm text-label-sm px-md py-xs rounded hover:bg-surface-variant transition-colors">Edit</button>
</div>
</div>
<!-- Quiz Card 3 -->
<div class="group border border-outline-variant rounded-lg p-lg hover:bg-surface-container-low transition-all duration-200">
<div class="flex justify-between items-start mb-md">
<span class="material-symbols-outlined text-primary bg-surface-variant p-sm rounded-lg" data-icon="terminal">terminal</span>
<button class="text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</div>
<h3 class="font-label-md text-label-md font-bold text-primary mb-xs">Tailwind CSS Fundamentals</h3>
<p class="font-caption text-caption text-outline mb-lg">Created Sep 29, 2023</p>
<div class="flex items-center justify-between mt-auto">
<div class="flex items-center gap-xs text-on-surface-variant">
<span class="material-symbols-outlined text-[18px]" data-icon="list_alt">list_alt</span>
<span class="font-caption text-caption">32 Questions</span>
</div>
<button class="text-primary font-label-sm text-label-sm px-md py-xs rounded hover:bg-surface-variant transition-colors">Edit</button>
</div>
</div>
<!-- Analytics Bento Slice (Spanning 2 columns) -->
<div class="lg:col-span-2 border border-outline-variant rounded-lg p-lg bg-surface-bright flex flex-col justify-between">
<div class="flex justify-between items-center mb-lg">
<h3 class="font-label-md text-label-md font-bold text-primary">Performance Overview</h3>
<span class="font-caption text-caption text-on-surface-variant bg-surface-container px-sm py-xs rounded">Last 7 Days</span>
</div>
<div class="flex gap-xl">
<div>
<p class="font-headline-md text-headline-md text-primary">1,240</p>
<p class="font-caption text-caption text-outline">Total Participants</p>
</div>
<div class="border-l border-outline-variant pl-xl">
<p class="font-headline-md text-headline-md text-primary">88%</p>
<p class="font-caption text-caption text-outline">Avg. Completion</p>
</div>
<div class="border-l border-outline-variant pl-xl">
<p class="font-headline-md text-headline-md text-primary">4.2m</p>
<p class="font-caption text-caption text-outline">Avg. Time Spent</p>
</div>
</div>
</div>
<!-- Empty State / Add New -->
<div class="border border-dashed border-outline-variant rounded-lg p-lg flex flex-col items-center justify-center text-center hover:border-primary transition-colors cursor-pointer">
<span class="material-symbols-outlined text-outline-variant mb-md text-[32px]" data-icon="add_circle">add_circle</span>
<p class="font-label-md text-label-md text-on-surface-variant">Start a New Template</p>
</div>
</div>
<!-- Footer Info -->
<footer class="mt-xxl pt-lg border-t border-outline-variant flex justify-between items-center text-on-surface-variant">
<div class="flex gap-lg">
<a class="font-caption text-caption hover:text-primary transition-colors" href="#">Privacy Policy</a>
<a class="font-caption text-caption hover:text-primary transition-colors" href="#">Terms of Service</a>
</div>
<p class="font-caption text-caption">© 2023 QuizFlow AI. System status: Operational</p>
</footer>
</main>
</div>
</body></html>

<!-- User Dashboard - My Quizzes -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        body {
            font-family: 'Inter', sans-serif;
            -webkit-font-smoothing: antialiased;
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "tertiary-container": "#333535",
                        "secondary-container": "#dcdddd",
                        "tertiary-fixed-dim": "#c6c6c7",
                        "surface-container-lowest": "#ffffff",
                        "surface-bright": "#f9f9f9",
                        "on-secondary-fixed-variant": "#454747",
                        "on-tertiary-container": "#9c9d9e",
                        "tertiary-fixed": "#e2e2e2",
                        "secondary-fixed": "#e2e2e2",
                        "on-tertiary-fixed": "#1a1c1c",
                        "on-primary-fixed-variant": "#494740",
                        "on-error-container": "#93000a",
                        "tertiary": "#1e2020",
                        "inverse-primary": "#cbc6bd",
                        "surface-variant": "#e2e2e2",
                        "primary-container": "#37352f",
                        "on-surface-variant": "#49473f",
                        "on-tertiary": "#ffffff",
                        "surface": "#f9f9f9",
                        "on-surface": "#1a1c1c",
                        "on-tertiary-fixed-variant": "#454747",
                        "outline-variant": "#cbc6bc",
                        "on-primary-container": "#a19d95",
                        "inverse-on-surface": "#f1f1f1",
                        "on-secondary": "#ffffff",
                        "error-container": "#ffdad6",
                        "error": "#ba1a1a",
                        "surface-container-highest": "#e2e2e2",
                        "on-secondary-fixed": "#1a1c1c",
                        "secondary": "#5d5f5f",
                        "on-background": "#1a1c1c",
                        "inverse-surface": "#2f3131",
                        "on-error": "#ffffff",
                        "on-secondary-container": "#5f6161",
                        "primary-fixed-dim": "#cbc6bd",
                        "primary-fixed": "#e7e2d9",
                        "surface-container": "#eeeeee",
                        "outline": "#7a776e",
                        "background": "#f9f9f9",
                        "surface-tint": "#615e57",
                        "primary": "#21201a",
                        "surface-container-low": "#f4f3f3",
                        "surface-container-high": "#e8e8e8",
                        "secondary-fixed-dim": "#c6c6c7",
                        "on-primary-fixed": "#1d1c16",
                        "on-primary": "#ffffff",
                        "surface-dim": "#dadada"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "spacing": {
                        "sm": "8px",
                        "gutter": "24px",
                        "xs": "4px",
                        "md": "16px",
                        "container-max": "900px",
                        "xxl": "64px",
                        "unit": "4px",
                        "lg": "24px",
                        "xl": "40px"
                    },
                    "fontFamily": {
                        "caption": ["Inter"],
                        "headline-lg": ["Inter"],
                        "body-lg": ["Inter"],
                        "label-md": ["Inter"],
                        "body-md": ["Inter"],
                        "label-sm": ["Inter"],
                        "headline-sm": ["Inter"],
                        "headline-md": ["Inter"],
                        "headline-xl": ["Inter"]
                    },
                    "fontSize": {
                        "caption": ["12px", {"lineHeight": "1.4", "fontWeight": "400"}],
                        "headline-lg": ["30px", {"lineHeight": "1.3", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                        "body-lg": ["17px", {"lineHeight": "1.6", "fontWeight": "400"}],
                        "label-md": ["14px", {"lineHeight": "1.4", "fontWeight": "500"}],
                        "body-md": ["15px", {"lineHeight": "1.6", "fontWeight": "400"}],
                        "label-sm": ["12px", {"lineHeight": "1.4", "letterSpacing": "0.03em", "fontWeight": "500"}],
                        "headline-sm": ["20px", {"lineHeight": "1.4", "fontWeight": "600"}],
                        "headline-md": ["24px", {"lineHeight": "1.4", "fontWeight": "600"}],
                        "headline-xl": ["40px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700"}]
                    }
                },
            },
        }
    </script>
</head>
<body class="bg-surface-container-lowest text-on-surface">
<!-- TopAppBar -->
<header class="sticky top-0 z-50 bg-surface dark:bg-inverse-surface border-b border-outline-variant dark:border-outline">
<div class="flex justify-between items-center h-16 w-full px-gutter max-w-container-max mx-auto">
<!-- Left: Title -->
<div class="flex items-center gap-md">
<span class="font-headline-sm text-headline-sm text-primary dark:text-primary-fixed-dim font-bold">Advanced Typography Systems</span>
</div>
<!-- Center: Progress -->
<div class="hidden md:flex flex-col items-center justify-center flex-1 max-w-[240px]">
<span class="font-label-md text-label-md text-secondary mb-xs">Question 3 of 10</span>
<div class="w-full bg-surface-container h-[2px] overflow-hidden">
<div class="bg-primary h-full w-[30%] transition-all duration-300"></div>
</div>
</div>
<!-- Right: Action -->
<div class="flex items-center justify-end">
<button class="px-md py-sm bg-surface border border-outline-variant text-on-surface hover:bg-surface-container-low transition-colors duration-200 text-label-md font-label-md">
                    Pause &amp; Save
                </button>
</div>
</div>
</header>
<!-- Main Content Canvas -->
<main class="max-w-container-max mx-auto px-gutter py-xxl min-h-[calc(100vh-128px)]">
<article class="flex flex-col gap-xl">
<!-- Question Heading -->
<section>
<h1 class="font-headline-md text-headline-md text-primary leading-tight">
                    Which of the following best describes the optical principle of "overshoot" in typeface design?
                </h1>
</section>
<!-- Diagnostic Visualization (Optional High-End UI Element) -->
<div class="w-full h-64 bg-surface-container-low border border-outline-variant flex items-center justify-center relative overflow-hidden group">
<img class="w-full h-full object-cover opacity-10" data-alt="A clean technical diagram of typography elements shown in a minimalist studio setting. The lighting is soft and clinical, highlighting the precise curves of a large sans-serif capital letter O. Fine red architectural lines indicate the baseline and x-height, demonstrating the subtle extension of curved forms beyond the standard guides. The overall aesthetic is professional, monochrome, and focuses on high-precision graphic design principles." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFOQep9B0POtYRnSUdBU7CVvddJqdz6sJpdJKsolSzWDxw0I3mFFKeAPP_k8DvYn73Tp7BZ70t6soLh7aAn91Y6d-fAsqxj22Ay5jTUA5zxOM0jjFde8hoYzMhMfiRUTMV-JZhxwUDESJj61iI1MMkcYml_m147VPN8-qcUcRCvcNqCKbSNcFPdXmTntCDTXKhfhqf2ibVdYYS65SRXV31EisDK3yOb2Jld6z14-__vevYYgimhQhM5yoCHEjC9u5kqdm9mFQSyh7-"/>
<div class="absolute inset-0 flex items-center justify-center pointer-events-none">
<span class="text-[180px] font-bold text-primary select-none opacity-20">O</span>
<div class="absolute w-full border-b border-dashed border-outline opacity-30 top-[20%]"></div>
<div class="absolute w-full border-b border-dashed border-outline opacity-30 bottom-[20%]"></div>
</div>
</div>
<!-- Options List -->
<section class="flex flex-col border border-outline-variant">
<!-- Option 1 -->
<label class="group flex items-center p-md cursor-pointer hover:bg-surface-container-low transition-colors border-b border-outline-variant last:border-b-0">
<div class="relative flex items-center justify-center w-md h-md mr-md">
<input class="sr-only" name="quiz-option" type="radio"/>
<div class="w-[14px] h-[14px] rounded-full border border-outline-variant group-hover:border-primary transition-colors"></div>
</div>
<span class="font-body-md text-body-md text-on-surface">The practice of increasing character width to improve legibility at small sizes.</span>
</label>
<!-- Option 2 -->
<label class="group flex items-center p-md cursor-pointer hover:bg-surface-container-low transition-colors border-b border-outline-variant last:border-b-0">
<div class="relative flex items-center justify-center w-md h-md mr-md">
<input class="sr-only" name="quiz-option" type="radio"/>
<div class="w-[14px] h-[14px] rounded-full border border-outline-variant group-hover:border-primary transition-colors"></div>
</div>
<span class="font-body-md text-body-md text-on-surface">The horizontal distance between two specific glyphs to balance white space.</span>
</label>
<!-- Option 3 (Selected) -->
<label class="group flex items-center p-md cursor-pointer bg-surface-container-low border-b border-outline-variant last:border-b-0">
<div class="relative flex items-center justify-center w-md h-md mr-md">
<input checked="" class="sr-only" name="quiz-option" type="radio"/>
<div class="w-[14px] h-[14px] rounded-full border border-primary-container bg-primary-container"></div>
<div class="absolute w-[4px] h-[4px] rounded-full bg-white"></div>
</div>
<span class="font-body-md text-body-md text-primary font-bold">The slight extension of rounded or pointed characters beyond the baseline or x-height to appear optically aligned.</span>
</label>
<!-- Option 4 -->
<label class="group flex items-center p-md cursor-pointer hover:bg-surface-container-low transition-colors border-b border-outline-variant last:border-b-0">
<div class="relative flex items-center justify-center w-md h-md mr-md">
<input class="sr-only" name="quiz-option" type="radio"/>
<div class="w-[14px] h-[14px] rounded-full border border-outline-variant group-hover:border-primary transition-colors"></div>
</div>
<span class="font-body-md text-body-md text-on-surface">The adjustment of stroke thickness to compensate for visual blooming in print processes.</span>
</label>
</section>
</article>
</main>
<!-- Bottom Navigation Shell -->
<nav class="fixed bottom-0 left-0 right-0 bg-surface dark:bg-inverse-surface border-t border-outline-variant dark:border-outline z-50">
<div class="flex justify-between items-center px-gutter py-md max-w-container-max mx-auto h-16">
<!-- Previous Action -->
<button class="flex items-center gap-xs text-secondary hover:bg-surface-container-low px-md py-sm rounded transition-colors active:scale-95 duration-150">
<span class="material-symbols-outlined text-[20px]" data-icon="arrow_back">arrow_back</span>
<span class="font-label-md text-label-md">Previous</span>
</button>
<!-- Next Action -->
<button class="flex items-center gap-xs bg-primary-container text-on-primary px-lg py-sm rounded-lg hover:opacity-90 transition-all active:scale-95 duration-150">
<span class="font-label-md text-label-md font-bold">Next Question</span>
<span class="material-symbols-outlined text-[20px]" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
</nav>
<!-- Content padding for fixed footer -->
<div class="h-16"></div>
</body></html>

<!-- Student Quiz - Taking View -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sign in to Essential</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "background": "#f9f9f9",
                        "on-tertiary-container": "#9c9d9e",
                        "on-surface-variant": "#49473f",
                        "on-error": "#ffffff",
                        "inverse-primary": "#cbc6bd",
                        "on-primary": "#ffffff",
                        "primary-fixed-dim": "#cbc6bd",
                        "on-tertiary-fixed": "#1a1c1c",
                        "error": "#ba1a1a",
                        "surface-container-highest": "#e2e2e2",
                        "outline": "#7a776e",
                        "inverse-surface": "#2f3131",
                        "secondary-fixed": "#e2e2e2",
                        "on-secondary-fixed": "#1a1c1c",
                        "on-background": "#1a1c1c",
                        "on-primary-fixed": "#1d1c16",
                        "tertiary-fixed": "#e2e2e2",
                        "surface-bright": "#f9f9f9",
                        "error-container": "#ffdad6",
                        "primary": "#21201a",
                        "outline-variant": "#cbc6bc",
                        "on-secondary-container": "#5f6161",
                        "surface-container": "#eeeeee",
                        "primary-fixed": "#e7e2d9",
                        "primary-container": "#37352f",
                        "secondary-container": "#dcdddd",
                        "secondary": "#5d5f5f",
                        "tertiary": "#1e2020",
                        "surface": "#f9f9f9",
                        "surface-container-lowest": "#ffffff",
                        "secondary-fixed-dim": "#c6c6c7",
                        "on-tertiary": "#ffffff",
                        "surface-container-low": "#f4f3f3",
                        "on-error-container": "#93000a",
                        "on-secondary-fixed-variant": "#454747",
                        "on-secondary": "#ffffff",
                        "surface-container-high": "#e8e8e8",
                        "tertiary-container": "#333535",
                        "on-surface": "#1a1c1c",
                        "inverse-on-surface": "#f1f1f1",
                        "tertiary-fixed-dim": "#c6c6c7",
                        "surface-dim": "#dadada",
                        "on-primary-fixed-variant": "#494740",
                        "surface-tint": "#615e57",
                        "on-primary-container": "#a19d95",
                        "on-tertiary-fixed-variant": "#454747",
                        "surface-variant": "#e2e2e2"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "spacing": {
                        "xxl": "64px",
                        "gutter": "24px",
                        "sm": "8px",
                        "xs": "4px",
                        "md": "16px",
                        "container-max": "900px",
                        "unit": "4px",
                        "lg": "24px",
                        "xl": "40px"
                    },
                    "fontFamily": {
                        "headline-lg": ["Inter"],
                        "label-md": ["Inter"],
                        "caption": ["Inter"],
                        "headline-xl": ["Inter"],
                        "body-md": ["Inter"],
                        "headline-sm": ["Inter"],
                        "body-lg": ["Inter"],
                        "label-sm": ["Inter"],
                        "headline-md": ["Inter"]
                    },
                    "fontSize": {
                        "headline-lg": ["30px", {"lineHeight": "1.3", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                        "label-md": ["14px", {"lineHeight": "1.4", "fontWeight": "500"}],
                        "caption": ["12px", {"lineHeight": "1.4", "fontWeight": "400"}],
                        "headline-xl": ["40px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                        "body-md": ["15px", {"lineHeight": "1.6", "fontWeight": "400"}],
                        "headline-sm": ["20px", {"lineHeight": "1.4", "fontWeight": "600"}],
                        "body-lg": ["17px", {"lineHeight": "1.6", "fontWeight": "400"}],
                        "label-sm": ["12px", {"lineHeight": "1.4", "letterSpacing": "0.03em", "fontWeight": "500"}],
                        "headline-md": ["24px", {"lineHeight": "1.4", "fontWeight": "600"}]
                    }
                },
            },
        }
    </script>
<style>
        body {
            background-color: #F7F7F7;
        }
        .invisible-input {
            background: transparent;
            border: none;
            border-bottom: 1px solid #EBEBEB;
            border-radius: 0;
            padding-left: 0;
            padding-right: 0;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
        .invisible-input:focus, .invisible-input:hover {
            outline: none;
            border: 1px solid #EBEBEB;
            box-shadow: none;
            padding-left: 8px;
            padding-right: 8px;
        }
        .invisible-input::placeholder {
            color: #73726E;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
</head>
<body class="flex items-center justify-center min-h-screen font-body-md text-on-surface">
<!-- Primary Canvas Container -->
<main class="w-full max-w-[400px] mx-md">
<!-- Login Card -->
<section class="bg-surface-container-lowest border border-outline-variant rounded-lg p-xxl flex flex-col gap-xl">
<!-- Brand & Header -->
<header class="flex flex-col items-center gap-md">
<div class="flex items-center gap-xs">
<span class="material-symbols-outlined text-primary" data-icon="blur_on">blur_on</span>
<span class="font-headline-sm text-headline-sm font-bold text-primary">Essential</span>
</div>
<h1 class="font-headline-sm text-headline-sm text-on-surface text-center">Sign in to your account</h1>
</header>
<!-- Authentication Form -->
<form class="flex flex-col gap-lg">
<!-- Email Field -->
<div class="flex flex-col gap-xs">
<label class="font-label-sm text-label-sm text-on-surface-variant" for="email">Email</label>
<input class="invisible-input h-xl font-body-md text-on-surface" id="email" name="email" placeholder="name@company.com" type="email"/>
</div>
<!-- Password Field -->
<div class="flex flex-col gap-xs">
<div class="flex justify-between items-center">
<label class="font-label-sm text-label-sm text-on-surface-variant" for="password">Password</label>
<a class="font-label-sm text-label-sm text-secondary hover:text-primary transition-colors" href="#">Forgot?</a>
</div>
<input class="invisible-input h-xl font-body-md text-on-surface" id="password" name="password" placeholder="••••••••" type="password"/>
</div>
<!-- Primary Action -->
<div class="pt-md">
<button class="w-full bg-primary-container text-on-primary font-label-md text-label-md h-[44px] rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center" type="submit">
                        Sign In
                    </button>
</div>
</form>
<!-- Footer Navigation -->
<footer class="flex flex-col items-center gap-md">
<div class="w-full border-t border-outline-variant opacity-50"></div>
<a class="font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-low px-md py-sm rounded transition-colors duration-150" href="#">
                    Don't have an account? Sign up
                </a>
</footer>
</section>
<!-- Optional Bottom Branding/Meta -->
<aside class="mt-xl flex justify-center gap-lg">
<span class="font-caption text-caption text-on-tertiary-container">Privacy Policy</span>
<span class="font-caption text-caption text-on-tertiary-container">Terms of Service</span>
<span class="font-caption text-caption text-on-tertiary-container">© 2024 Essential Inc.</span>
</aside>
</main>
<!-- Visual Anchor Background Decoration (Minimalist Texture) -->
<div class="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
<div class="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.03]">
<svg viewbox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
<circle class="text-primary" cx="50" cy="50" fill="none" r="40" stroke="currentColor" stroke-width="0.5"></circle>
<path class="text-primary" d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" stroke-width="0.5"></path>
</svg>
</div>
</div>
</body></html>

<!-- Login - Untitled Quiz -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "tertiary-fixed": "#e2e2e2",
                    "surface-container": "#eeeeee",
                    "on-surface-variant": "#49473f",
                    "on-primary-container": "#a19d95",
                    "tertiary-fixed-dim": "#c6c6c7",
                    "secondary-fixed": "#e2e2e2",
                    "surface-bright": "#f9f9f9",
                    "on-secondary-fixed-variant": "#454747",
                    "surface-variant": "#e2e2e2",
                    "outline-variant": "#cbc6bc",
                    "background": "#f9f9f9",
                    "on-primary": "#ffffff",
                    "tertiary": "#1e2020",
                    "secondary-fixed-dim": "#c6c6c7",
                    "on-error": "#ffffff",
                    "inverse-surface": "#2f3131",
                    "secondary-container": "#dcdddd",
                    "secondary": "#5d5f5f",
                    "primary": "#21201a",
                    "on-tertiary-container": "#9c9d9e",
                    "surface": "#f9f9f9",
                    "tertiary-container": "#333535",
                    "surface-tint": "#615e57",
                    "primary-container": "#37352f",
                    "on-error-container": "#93000a",
                    "outline": "#7a776e",
                    "surface-container-low": "#f4f3f3",
                    "surface-dim": "#dadada",
                    "on-surface": "#1a1c1c",
                    "surface-container-lowest": "#ffffff",
                    "inverse-primary": "#cbc6bd",
                    "primary-fixed": "#e7e2d9",
                    "on-tertiary": "#ffffff",
                    "inverse-on-surface": "#f1f1f1",
                    "error": "#ba1a1a",
                    "surface-container-highest": "#e2e2e2",
                    "on-secondary": "#ffffff",
                    "primary-fixed-dim": "#cbc6bd",
                    "surface-container-high": "#e8e8e8",
                    "on-primary-fixed-variant": "#494740",
                    "on-tertiary-fixed-variant": "#454747",
                    "on-secondary-fixed": "#1a1c1c",
                    "on-secondary-container": "#5f6161",
                    "on-background": "#1a1c1c",
                    "error-container": "#ffdad6",
                    "on-primary-fixed": "#1d1c16",
                    "on-tertiary-fixed": "#1a1c1c"
            },
            "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "0.75rem"
            },
            "spacing": {
                    "lg": "24px",
                    "md": "16px",
                    "xs": "4px",
                    "xl": "40px",
                    "gutter": "24px",
                    "unit": "4px",
                    "container-max": "900px",
                    "xxl": "64px",
                    "sm": "8px"
            },
            "fontFamily": {
                    "headline-sm": ["Inter"],
                    "caption": ["Inter"],
                    "headline-lg": ["Inter"],
                    "label-sm": ["Inter"],
                    "label-md": ["Inter"],
                    "headline-xl": ["Inter"],
                    "headline-md": ["Inter"],
                    "body-md": ["Inter"],
                    "body-lg": ["Inter"]
            },
            "fontSize": {
                    "headline-sm": ["20px", {"lineHeight": "1.4", "fontWeight": "600"}],
                    "caption": ["12px", {"lineHeight": "1.4", "fontWeight": "400"}],
                    "headline-lg": ["30px", {"lineHeight": "1.3", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                    "label-sm": ["12px", {"lineHeight": "1.4", "letterSpacing": "0.03em", "fontWeight": "500"}],
                    "label-md": ["14px", {"lineHeight": "1.4", "fontWeight": "500"}],
                    "headline-xl": ["40px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                    "headline-md": ["24px", {"lineHeight": "1.4", "fontWeight": "600"}],
                    "body-md": ["15px", {"lineHeight": "1.6", "fontWeight": "400"}],
                    "body-lg": ["17px", {"lineHeight": "1.6", "fontWeight": "400"}]
            }
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        body {
            background-color: #FFFFFF;
        }
    </style>
</head>
<body class="font-body-md text-on-surface">
<!-- TopNavBar -->
<header class="bg-surface docked full-width top-0 border-b border-outline-variant">
<div class="flex justify-between items-center w-full px-lg py-md max-w-container-max mx-auto">
<div class="font-headline-sm text-headline-sm font-bold text-primary">Untitled Quiz</div>
<nav class="hidden md:flex gap-lg items-center">
<a class="font-body-md text-body-md text-on-surface-variant hover:bg-surface-container-low transition-colors px-sm py-xs" href="#">Drafts</a>
<a class="font-body-md text-body-md text-on-surface-variant hover:bg-surface-container-low transition-colors px-sm py-xs" href="#">Templates</a>
<a class="font-body-md text-body-md text-on-surface-variant hover:bg-surface-container-low transition-colors px-sm py-xs" href="#">Explore</a>
</nav>
<div class="flex gap-md items-center">
<button class="font-label-md text-label-md px-md py-sm border border-outline-variant hover:bg-surface-container-low transition-colors">Log in</button>
<button class="font-label-md text-label-md px-md py-sm bg-primary-container text-on-primary hover:opacity-90 transition-opacity">Create Quiz</button>
</div>
</div>
</header>
<main class="max-w-container-max mx-auto px-lg py-xxl">
<!-- Score Header -->
<section class="mb-xl text-center md:text-left">
<h1 class="font-headline-xl text-headline-xl text-primary mb-xs">85%</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant">You answered 17 out of 20 questions correctly</p>
</section>
<!-- Action Row -->
<section class="flex flex-col sm:flex-row gap-md mb-xxl border-b border-outline-variant pb-xl">
<button class="px-lg py-md bg-primary-container text-on-primary font-label-md text-label-md hover:opacity-90 transition-all active:opacity-80">
                Back to Dashboard
            </button>
<button class="px-lg py-md border border-outline-variant text-primary font-label-md text-label-md hover:bg-surface-container-low transition-all active:opacity-80">
                Review Answers
            </button>
</section>
<!-- Question Review List -->
<section class="space-y-0">
<!-- Question Item Correct -->
<div class="py-xl border-b border-outline-variant flex gap-md items-start">
<span class="material-symbols-outlined text-primary mt-1" data-icon="check_circle">check_circle</span>
<div class="flex-1">
<h3 class="font-headline-sm text-headline-sm text-primary mb-sm">Which of the following best describes the optical principle of 'overshoot' in typeface design?</h3>
<div class="space-y-xs">
<p class="font-body-md text-body-md"><span class="text-on-surface-variant">Your Answer:</span> <span class="font-bold">Extending curved characters slightly beyond the baseline and cap height.</span></p>
<p class="font-caption text-caption text-on-primary-container">Correct Answer: Same as above</p>
</div>
</div>
</div>
<!-- Question Item Incorrect -->
<div class="py-xl border-b border-outline-variant flex gap-md items-start">
<span class="material-symbols-outlined text-primary mt-1" data-icon="cancel">cancel</span>
<div class="flex-1">
<h3 class="font-headline-sm text-headline-sm text-primary mb-sm">What is the primary function of a 'bento grid' in modern UI design?</h3>
<div class="space-y-xs">
<p class="font-body-md text-body-md"><span class="text-on-surface-variant">Your Answer:</span> <span class="font-bold">To create a perfectly symmetrical layout for textual content.</span></p>
<p class="font-caption text-caption text-on-primary-container">Correct Answer: To organize diverse content into modular, rectangular cells of varying sizes.</p>
</div>
</div>
</div>
<!-- Question Item Correct -->
<div class="py-xl border-b border-outline-variant flex gap-md items-start">
<span class="material-symbols-outlined text-primary mt-1" data-icon="check_circle">check_circle</span>
<div class="flex-1">
<h3 class="font-headline-sm text-headline-sm text-primary mb-sm">In the context of 'digital essentialism', what is the main goal of reducing UI complexity?</h3>
<div class="space-y-xs">
<p class="font-body-md text-body-md"><span class="text-on-surface-variant">Your Answer:</span> <span class="font-bold">To minimize cognitive load and focus on primary tasks.</span></p>
<p class="font-caption text-caption text-on-primary-container">Correct Answer: Same as above</p>
</div>
</div>
</div>
<!-- Question Item Correct -->
<div class="py-xl border-b border-outline-variant flex gap-md items-start">
<span class="material-symbols-outlined text-primary mt-1" data-icon="check_circle">check_circle</span>
<div class="flex-1">
<h3 class="font-headline-sm text-headline-sm text-primary mb-sm">Which CSS property is most commonly used to implement 'tonal layering' depth?</h3>
<div class="space-y-xs">
<p class="font-body-md text-body-md"><span class="text-on-surface-variant">Your Answer:</span> <span class="font-bold">Background-color</span></p>
<p class="font-caption text-caption text-on-primary-container">Correct Answer: Same as above</p>
</div>
</div>
</div>
</section>
<!-- Stats Bento Section -->
<section class="mt-xxl grid grid-cols-1 md:grid-cols-3 gap-md">
<div class="p-lg border border-outline-variant flex flex-col justify-between h-40">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Time Spent</span>
<div class="font-headline-md text-headline-md text-primary">12m 45s</div>
</div>
<div class="p-lg border border-outline-variant flex flex-col justify-between h-40">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Difficulty</span>
<div class="font-headline-md text-headline-md text-primary">Advanced</div>
</div>
<div class="p-lg border border-outline-variant flex flex-col justify-between h-40">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Percentile</span>
<div class="font-headline-md text-headline-md text-primary">Top 12%</div>
</div>
</section>
</main>
<!-- Footer -->
<footer class="border-t border-outline-variant mt-xxl">
<div class="flex flex-col md:flex-row justify-between items-center w-full px-lg py-xl max-w-container-max mx-auto">
<div class="font-caption text-caption text-on-surface-variant">© 2024 Untitled Quiz. All rights reserved.</div>
<div class="flex gap-lg mt-md md:mt-0">
<a class="font-caption text-caption text-on-surface-variant hover:text-primary transition-colors underline" href="#">Privacy</a>
<a class="font-caption text-caption text-on-surface-variant hover:text-primary transition-colors underline" href="#">Terms</a>
<a class="font-caption text-caption text-on-surface-variant hover:text-primary transition-colors underline" href="#">Status</a>
<a class="font-caption text-caption text-on-surface-variant hover:text-primary transition-colors underline" href="#">Contact</a>
</div>
</div>
</footer>
</body></html>

<!-- Quiz Results - Untitled Quiz -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>TestCenter Editor</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-tertiary": "#ffffff",
                        "on-surface-variant": "#49473f",
                        "surface-tint": "#615e57",
                        "error-container": "#ffdad6",
                        "on-secondary": "#ffffff",
                        "background": "#f9f9f9",
                        "on-tertiary-container": "#9c9d9e",
                        "surface-container-lowest": "#ffffff",
                        "on-error-container": "#93000a",
                        "primary": "#21201a",
                        "surface": "#f9f9f9",
                        "primary-fixed": "#e7e2d9",
                        "tertiary-container": "#333535",
                        "primary-container": "#37352f",
                        "on-tertiary-fixed": "#1a1c1c",
                        "inverse-on-surface": "#f1f1f1",
                        "on-secondary-container": "#5f6161",
                        "outline": "#7a776e",
                        "error": "#ba1a1a",
                        "surface-variant": "#e2e2e2",
                        "surface-container-low": "#f4f3f3",
                        "on-surface": "#1a1c1c",
                        "on-tertiary-fixed-variant": "#454747",
                        "inverse-primary": "#cbc6bd",
                        "surface-bright": "#f9f9f9",
                        "primary-fixed-dim": "#cbc6bd",
                        "surface-container": "#eeeeee",
                        "on-primary-container": "#a19d95",
                        "on-secondary-fixed": "#1a1c1c",
                        "on-background": "#1a1c1c",
                        "inverse-surface": "#2f3131",
                        "on-error": "#ffffff",
                        "outline-variant": "#cbc6bc",
                        "on-secondary-fixed-variant": "#454747",
                        "secondary-fixed-dim": "#c6c6c7",
                        "secondary": "#5d5f5f",
                        "surface-container-high": "#e8e8e8",
                        "surface-container-highest": "#e2e2e2",
                        "on-primary-fixed": "#1d1c16",
                        "on-primary-fixed-variant": "#494740",
                        "tertiary-fixed-dim": "#c6c6c7",
                        "tertiary": "#1e2020",
                        "secondary-container": "#dcdddd",
                        "surface-dim": "#dadada",
                        "on-primary": "#ffffff",
                        "secondary-fixed": "#e2e2e2",
                        "tertiary-fixed": "#e2e2e2"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "spacing": {
                        "xl": "40px",
                        "container-max": "900px",
                        "gutter": "24px",
                        "sm": "8px",
                        "unit": "4px",
                        "xxl": "64px",
                        "xs": "4px",
                        "lg": "24px",
                        "md": "16px"
                    },
                    "fontFamily": {
                        "label-sm": ["Inter"],
                        "caption": ["Inter"],
                        "body-md": ["Inter"],
                        "headline-lg": ["Inter"],
                        "label-md": ["Inter"],
                        "headline-sm": ["Inter"],
                        "headline-md": ["Inter"],
                        "headline-xl": ["Inter"],
                        "body-lg": ["Inter"]
                    },
                    "fontSize": {
                        "label-sm": ["12px", {"lineHeight": "1.4", "letterSpacing": "0.03em", "fontWeight": "500"}],
                        "caption": ["12px", {"lineHeight": "1.4", "fontWeight": "400"}],
                        "body-md": ["15px", {"lineHeight": "1.6", "fontWeight": "400"}],
                        "headline-lg": ["30px", {"lineHeight": "1.3", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                        "label-md": ["14px", {"lineHeight": "1.4", "fontWeight": "500"}],
                        "headline-sm": ["20px", {"lineHeight": "1.4", "fontWeight": "600"}],
                        "headline-md": ["24px", {"lineHeight": "1.4", "fontWeight": "600"}],
                        "headline-xl": ["40px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                        "body-lg": ["17px", {"lineHeight": "1.6", "fontWeight": "400"}]
                    }
                },
            },
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
        }
        input:focus, textarea:focus {
            outline: none;
        }
        .invisible-input {
            background: transparent;
            border: none;
            padding: 0;
            width: 100%;
        }
        .invisible-input:focus {
            border-bottom: 1px solid #EBEBEB;
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #EBEBEB;
            border-radius: 2px;
        }
    </style>
</head>
<body class="bg-surface font-body-md text-on-surface selection:bg-primary-fixed">
<!-- TopAppBar -->
<header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-lg py-sm max-w-none bg-surface border-b border-outline-variant">
<div class="flex items-center gap-md">
<input class="font-headline-sm text-headline-sm font-semibold text-primary invisible-input w-auto min-w-[200px]" spellcheck="false" type="text" value="TestCenter"/>
</div>
<div class="flex items-center gap-sm">
<button class="bg-surface-container-low hover:bg-surface-container-high transition-colors duration-200 px-md py-sm rounded-lg flex items-center gap-xs text-on-surface-variant font-label-md text-label-md">
<span class="material-symbols-outlined" data-icon="download">download</span>
                Download
            </button>
<button class="bg-primary-container text-on-tertiary px-lg py-sm rounded-lg font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all">
                Publish
            </button>
<div class="h-6 w-[1px] bg-outline-variant mx-xs"></div>
<button class="p-sm hover:bg-surface-container-low rounded-lg transition-colors duration-200">
<span class="material-symbols-outlined text-on-surface-variant" data-icon="settings">settings</span>
</button>
<button class="p-sm hover:bg-surface-container-low rounded-lg transition-colors duration-200">
<span class="material-symbols-outlined text-on-surface-variant" data-icon="more_vert">more_vert</span>
</button>
</div>
</header>
<!-- SideNavBar (Right-docked) -->
<aside class="fixed right-0 top-16 h-[calc(100vh-64px)] z-40 flex flex-col p-lg bg-surface-container-low border-l border-outline-variant w-80">
<div class="mb-xl">
<h2 class="font-headline-sm text-headline-sm font-bold text-primary mb-xs">Settings</h2>
<p class="text-secondary font-body-md text-body-md opacity-70">Global Configurations</p>
</div>
<nav class="flex flex-col gap-unit">
<a class="flex items-center gap-md py-sm px-md rounded-lg text-primary font-bold border-l-2 border-primary pl-md bg-surface-container-high transition-all" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span class="font-label-md text-label-md">General</span>
</a>
<a class="flex items-center gap-md py-sm px-md rounded-lg text-secondary font-medium pl-md hover:bg-surface-container-high transition-all" href="#">
<span class="material-symbols-outlined" data-icon="timer">timer</span>
<span class="font-label-md text-label-md">Timing</span>
</a>
<a class="flex items-center gap-md py-sm px-md rounded-lg text-secondary font-medium pl-md hover:bg-surface-container-high transition-all" href="#">
<span class="material-symbols-outlined" data-icon="grade">grade</span>
<span class="font-label-md text-label-md">Grading</span>
</a>
<a class="flex items-center gap-md py-sm px-md rounded-lg text-secondary font-medium pl-md hover:bg-surface-container-high transition-all" href="#">
<span class="material-symbols-outlined" data-icon="lock">lock</span>
<span class="font-label-md text-label-md">Access</span>
</a>
</nav>
<div class="mt-auto">
<button class="w-full bg-primary text-on-tertiary py-md rounded-lg font-label-md text-label-md hover:opacity-90 active:translate-x-1 transition-all">
                Save Changes
            </button>
</div>
</aside>
<!-- Main Content Canvas -->
<main class="pt-xxl pb-xxl pr-[320px] flex flex-col items-center min-h-screen">
<div class="w-full max-w-container-max px-gutter mt-xxl">
<!-- Question List Stack -->
<div class="flex flex-col gap-xl">
<!-- Question 1: Multiple Choice -->
<article class="p-xl bg-surface border border-outline-variant rounded-xl group transition-all hover:border-outline">
<div class="flex justify-between items-start mb-lg">
<div class="flex items-center gap-sm text-on-surface-variant">
<span class="material-symbols-outlined" data-icon="drag_indicator">drag_indicator</span>
<span class="font-label-sm text-label-sm uppercase tracking-wider">Question 1</span>
</div>
<div class="relative">
<button class="flex items-center gap-xs px-sm py-xs border border-outline-variant rounded bg-surface-container-low text-on-surface font-label-md text-label-md">
<span class="material-symbols-outlined text-[18px]" data-icon="list">list</span>
                                Multiple Choice
                                <span class="material-symbols-outlined text-[18px]" data-icon="expand_more">expand_more</span>
</button>
</div>
</div>
<div class="mb-xl">
<input class="font-headline-md text-headline-md text-on-surface invisible-input py-sm focus:border-b-primary transition-all" placeholder="What is the capital of France?" spellcheck="false" type="text"/>
</div>
<div class="flex flex-col gap-md">
<!-- Option A -->
<div class="flex items-center gap-md group/option">
<div class="w-4 h-4 border border-outline-variant rounded-full flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
<div class="w-2 h-2 bg-primary rounded-full opacity-100"></div>
</div>
<input class="font-body-lg text-body-lg invisible-input py-xs border-b border-transparent focus:border-outline-variant" spellcheck="false" type="text" value="Paris"/>
<button class="opacity-0 group-hover/option:opacity-100 transition-opacity">
<span class="material-symbols-outlined text-on-surface-variant" data-icon="close">close</span>
</button>
</div>
<!-- Option B -->
<div class="flex items-center gap-md group/option">
<div class="w-4 h-4 border border-outline-variant rounded-full flex items-center justify-center cursor-pointer hover:border-primary transition-colors"></div>
<input class="font-body-lg text-body-lg invisible-input py-xs border-b border-transparent focus:border-outline-variant" spellcheck="false" type="text" value="London"/>
<button class="opacity-0 group-hover/option:opacity-100 transition-opacity">
<span class="material-symbols-outlined text-on-surface-variant" data-icon="close">close</span>
</button>
</div>
<!-- Option C -->
<div class="flex items-center gap-md group/option">
<div class="w-4 h-4 border border-outline-variant rounded-full flex items-center justify-center cursor-pointer hover:border-primary transition-colors"></div>
<input class="font-body-lg text-body-lg invisible-input py-xs border-b border-transparent focus:border-outline-variant" spellcheck="false" type="text" value="Berlin"/>
<button class="opacity-0 group-hover/option:opacity-100 transition-opacity">
<span class="material-symbols-outlined text-on-surface-variant" data-icon="close">close</span>
</button>
</div>
<!-- Add Option Button -->
<button class="flex items-center gap-sm text-secondary font-label-md text-label-md mt-sm hover:text-primary transition-colors">
<span class="material-symbols-outlined text-[20px]" data-icon="add">add</span>
                            Add option
                        </button>
</div>
</article>
<!-- Question 2: Open-ended -->
<article class="p-xl bg-surface border border-outline-variant rounded-xl group transition-all hover:border-outline">
<div class="flex justify-between items-start mb-lg">
<div class="flex items-center gap-sm text-on-surface-variant">
<span class="material-symbols-outlined" data-icon="drag_indicator">drag_indicator</span>
<span class="font-label-sm text-label-sm uppercase tracking-wider">Question 2</span>
</div>
<div>
<button class="flex items-center gap-xs px-sm py-xs border border-outline-variant rounded bg-surface-container-low text-on-surface font-label-md text-label-md">
<span class="material-symbols-outlined text-[18px]" data-icon="subject">subject</span>
                                Open-ended
                                <span class="material-symbols-outlined text-[18px]" data-icon="expand_more">expand_more</span>
</button>
</div>
</div>
<div class="mb-lg">
<input class="font-headline-md text-headline-md text-on-surface invisible-input py-sm focus:border-b-primary transition-all" placeholder="Explain the process of photosynthesis." spellcheck="false" type="text"/>
</div>
<div class="w-full">
<div class="p-lg bg-surface-container-low border border-dashed border-outline-variant rounded-lg min-h-[120px] text-secondary font-body-md opacity-50 flex items-center justify-center italic">
                            Answer field (User input area)
                        </div>
</div>
<div class="mt-lg flex justify-end">
<div class="flex gap-sm">
<button class="p-xs hover:bg-surface-container-high rounded transition-colors"><span class="material-symbols-outlined text-on-surface-variant" data-icon="content_copy">content_copy</span></button>
<button class="p-xs hover:bg-surface-container-high rounded transition-colors"><span class="material-symbols-outlined text-on-surface-variant" data-icon="delete">delete</span></button>
</div>
</div>
</article>
<!-- Add Question Trigger -->
<button class="group w-full py-xxl border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center gap-md hover:border-primary hover:bg-surface-container-low transition-all duration-200">
<div class="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors">
<span class="material-symbols-outlined text-secondary group-hover:text-white" data-icon="add">add</span>
</div>
<span class="font-label-md text-label-md text-secondary group-hover:text-primary">Add Question</span>
</button>
</div>
<!-- Footer Meta -->
<div class="mt-xxl pt-xl border-t border-outline-variant flex justify-between text-on-surface-variant font-label-sm text-label-sm opacity-60">
<p>Last edited 2 minutes ago</p>
<p>2 Questions • 10 Points</p>
</div>
</div>
</main>
<!-- Contextual FAB (Suppressed on settings/details but shown here for rapid add) -->
<button class="fixed bottom-lg right-[340px] w-14 h-14 bg-primary text-on-tertiary rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40">
<span class="material-symbols-outlined" data-icon="magic_button" style="font-variation-settings: 'FILL' 1;">magic_button</span>
</button>
</body></html>

<!-- Quiz Builder - Editor -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "secondary-fixed": "#e2e2e2",
                    "on-secondary-fixed": "#1a1c1c",
                    "inverse-surface": "#2f3131",
                    "surface-container-highest": "#e2e2e2",
                    "outline": "#7a776e",
                    "surface-container": "#eeeeee",
                    "primary-fixed": "#e7e2d9",
                    "primary-container": "#37352f",
                    "primary": "#21201a",
                    "outline-variant": "#cbc6bc",
                    "on-secondary-container": "#5f6161",
                    "error-container": "#ffdad6",
                    "tertiary-fixed": "#e2e2e2",
                    "surface-bright": "#f9f9f9",
                    "on-primary-fixed": "#1d1c16",
                    "on-background": "#1a1c1c",
                    "on-surface-variant": "#49473f",
                    "on-error": "#ffffff",
                    "on-tertiary-container": "#9c9d9e",
                    "background": "#f9f9f9",
                    "error": "#ba1a1a",
                    "on-tertiary-fixed": "#1a1c1c",
                    "primary-fixed-dim": "#cbc6bd",
                    "on-primary": "#ffffff",
                    "inverse-primary": "#cbc6bd",
                    "tertiary-fixed-dim": "#c6c6c7",
                    "surface-dim": "#dadada",
                    "on-primary-fixed-variant": "#494740",
                    "inverse-on-surface": "#f1f1f1",
                    "tertiary-container": "#333535",
                    "on-surface": "#1a1c1c",
                    "surface-container-high": "#e8e8e8",
                    "surface-variant": "#e2e2e2",
                    "on-tertiary-fixed-variant": "#454747",
                    "on-primary-container": "#a19d95",
                    "surface-tint": "#615e57",
                    "surface-container-lowest": "#ffffff",
                    "secondary-fixed-dim": "#c6c6c7",
                    "on-tertiary": "#ffffff",
                    "tertiary": "#1e2020",
                    "surface": "#f9f9f9",
                    "secondary-container": "#dcdddd",
                    "secondary": "#5d5f5f",
                    "on-secondary": "#ffffff",
                    "on-secondary-fixed-variant": "#454747",
                    "on-error-container": "#93000a",
                    "surface-container-low": "#f4f3f3"
            },
            "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "0.75rem"
            },
            "spacing": {
                    "xl": "40px",
                    "unit": "4px",
                    "lg": "24px",
                    "container-max": "900px",
                    "xs": "4px",
                    "md": "16px",
                    "xxl": "64px",
                    "gutter": "24px",
                    "sm": "8px"
            },
            "fontFamily": {
                    "headline-lg": ["Inter"],
                    "label-md": ["Inter"],
                    "caption": ["Inter"],
                    "body-md": ["Inter"],
                    "headline-xl": ["Inter"],
                    "headline-sm": ["Inter"],
                    "body-lg": ["Inter"],
                    "label-sm": ["Inter"],
                    "headline-md": ["Inter"]
            },
            "fontSize": {
                    "headline-lg": ["30px", {"lineHeight": "1.3", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                    "label-md": ["14px", {"lineHeight": "1.4", "fontWeight": "500"}],
                    "caption": ["12px", {"lineHeight": "1.4", "fontWeight": "400"}],
                    "body-md": ["15px", {"lineHeight": "1.6", "fontWeight": "400"}],
                    "headline-xl": ["40px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                    "headline-sm": ["20px", {"lineHeight": "1.4", "fontWeight": "600"}],
                    "body-lg": ["17px", {"lineHeight": "1.6", "fontWeight": "400"}],
                    "label-sm": ["12px", {"lineHeight": "1.4", "letterSpacing": "0.03em", "fontWeight": "500"}],
                    "headline-md": ["24px", {"lineHeight": "1.4", "fontWeight": "600"}]
            }
          },
        },
      }
    </script>
<style>
        body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
</head>
<body class="bg-surface-container-lowest text-on-surface">
<div class="flex min-h-screen">
<!-- Side Navigation Shell -->
<aside class="fixed left-0 top-0 h-full w-64 bg-surface-container-low border-r border-outline-variant flex flex-col py-lg">
<!-- Profile Snippet -->
<div class="px-md mb-xl">
<div class="flex items-center gap-md">
<img alt="Alex Rivers" class="w-10 h-10 rounded-lg object-cover" data-alt="A professional headshot of a person with a friendly expression, captured in soft, natural morning light. The background is a clean, minimalist studio setting with neutral grey tones. The photography style is high-end and corporate, emphasizing a monochrome aesthetic with deep contrast and sharp focus on the subject's features." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1YHk3Zu1yhzjKMWQ12j07GHt5SdroOZ3LOTypJyXDqBgsz0wJg7G7HkXOH0hhyj_RatFkAu0JIZBba-EmtPlZA5NpPJsrjMcCDG6qPuyPZvDlfddukdkRctpRaV9EoGX4P63-oGTaucbTshuXAzArZPQmVFMZGzi2en0etWgmsprJd1GZdXtLza_dcoIg-SNAk6EevAwN7DT0_ijARjxRl2R_IGFbH93M8jF2eSh2KNiG1QPda9dQfiZmLdhwDrqvIDu2mdV5mxDt"/>
<div>
<p class="font-headline-sm text-headline-sm text-primary">Alex Rivers</p>
<p class="font-label-sm text-label-sm text-on-surface-variant">Quiz Master</p>
</div>
</div>
</div>
<!-- Navigation Links -->
<nav class="flex-grow space-y-unit">
<a class="flex items-center gap-md border-l-2 border-primary bg-surface-variant text-primary font-bold px-md py-sm transition-all duration-200" href="#">
<span class="material-symbols-outlined" data-icon="quiz">quiz</span>
<span class="font-body-md text-body-md">My Quizzes</span>
</a>
<a class="flex items-center gap-md text-on-surface-variant px-md py-sm hover:bg-surface-container transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="assignment_turned_in">assignment_turned_in</span>
<span class="font-body-md text-body-md">Submissions</span>
</a>
<a class="flex items-center gap-md text-on-surface-variant px-md py-sm hover:bg-surface-container transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="analytics">analytics</span>
<span class="font-body-md text-body-md">Analytics</span>
</a>
<a class="flex items-center gap-md text-on-surface-variant px-md py-sm hover:bg-surface-container transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span class="font-body-md text-body-md">Settings</span>
</a>
</nav>
<!-- Footer Navigation -->
<div class="mt-auto border-t border-outline-variant pt-md">
<a class="flex items-center gap-md text-on-surface-variant px-md py-sm hover:bg-surface-container transition-colors mb-md" href="#">
<span class="material-symbols-outlined" data-icon="help">help</span>
<span class="font-body-md text-body-md">Help Center</span>
</a>
<a class="flex items-center gap-md text-on-surface-variant px-md py-sm hover:bg-surface-container transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="logout">logout</span>
<span class="font-body-md text-body-md">Log Out</span>
</a>
</div>
</aside>
<!-- Main Content Area (The Canvas) -->
<main class="ml-64 flex-grow p-xxl max-w-screen-2xl">
<!-- Top App Bar / Canvas Header -->
<header class="flex justify-between items-center mb-xl">
<div>
<h1 class="font-headline-lg text-headline-lg text-primary">My Quizzes</h1>
<p class="font-body-md text-body-md text-on-surface-variant">Manage and track your active quiz sessions.</p>
</div>
<div class="flex items-center gap-md">
<button class="p-sm text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button class="bg-primary-container text-on-primary font-label-md text-label-md px-lg py-sm rounded-lg hover:opacity-90 transition-opacity">
                        Create New Quiz
                    </button>
</div>
</header>
<!-- Bento Grid of Content -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
<!-- Quiz Card 1 -->
<div class="group border border-outline-variant rounded-lg p-lg hover:bg-surface-container-low transition-all duration-200">
<div class="flex justify-between items-start mb-md">
<span class="material-symbols-outlined text-primary bg-surface-variant p-sm rounded-lg" data-icon="psychology">psychology</span>
<button class="text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</div>
<h3 class="font-label-md text-label-md font-bold text-primary mb-xs">Advanced Typography Systems</h3>
<p class="font-caption text-caption text-outline mb-lg">Created Oct 12, 2023</p>
<div class="flex items-center justify-between mt-auto">
<div class="flex items-center gap-xs text-on-surface-variant">
<span class="material-symbols-outlined text-[18px]" data-icon="list_alt">list_alt</span>
<span class="font-caption text-caption">24 Questions</span>
</div>
<button class="text-primary font-label-sm text-label-sm px-md py-xs rounded hover:bg-surface-variant transition-colors">Edit</button>
</div>
</div>
<!-- Quiz Card 2 -->
<div class="group border border-outline-variant rounded-lg p-lg hover:bg-surface-container-low transition-all duration-200">
<div class="flex justify-between items-start mb-md">
<span class="material-symbols-outlined text-primary bg-surface-variant p-sm rounded-lg" data-icon="architecture">architecture</span>
<button class="text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</div>
<h3 class="font-label-md text-label-md font-bold text-primary mb-xs">Modernist Design Theory</h3>
<p class="font-caption text-caption text-outline mb-lg">Created Oct 08, 2023</p>
<div class="flex items-center justify-between mt-auto">
<div class="flex items-center gap-xs text-on-surface-variant">
<span class="material-symbols-outlined text-[18px]" data-icon="list_alt">list_alt</span>
<span class="font-caption text-caption">18 Questions</span>
</div>
<button class="text-primary font-label-sm text-label-sm px-md py-xs rounded hover:bg-surface-variant transition-colors">Edit</button>
</div>
</div>
<!-- Quiz Card 3 -->
<div class="group border border-outline-variant rounded-lg p-lg hover:bg-surface-container-low transition-all duration-200">
<div class="flex justify-between items-start mb-md">
<span class="material-symbols-outlined text-primary bg-surface-variant p-sm rounded-lg" data-icon="terminal">terminal</span>
<button class="text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</div>
<h3 class="font-label-md text-label-md font-bold text-primary mb-xs">Tailwind CSS Fundamentals</h3>
<p class="font-caption text-caption text-outline mb-lg">Created Sep 29, 2023</p>
<div class="flex items-center justify-between mt-auto">
<div class="flex items-center gap-xs text-on-surface-variant">
<span class="material-symbols-outlined text-[18px]" data-icon="list_alt">list_alt</span>
<span class="font-caption text-caption">32 Questions</span>
</div>
<button class="text-primary font-label-sm text-label-sm px-md py-xs rounded hover:bg-surface-variant transition-colors">Edit</button>
</div>
</div>
<!-- Analytics Bento Slice (Spanning 2 columns) -->
<div class="lg:col-span-2 border border-outline-variant rounded-lg p-lg bg-surface-bright flex flex-col justify-between">
<div class="flex justify-between items-center mb-lg">
<h3 class="font-label-md text-label-md font-bold text-primary">Performance Overview</h3>
<span class="font-caption text-caption text-on-surface-variant bg-surface-container px-sm py-xs rounded">Last 7 Days</span>
</div>
<div class="flex gap-xl">
<div>
<p class="font-headline-md text-headline-md text-primary">1,240</p>
<p class="font-caption text-caption text-outline">Total Participants</p>
</div>
<div class="border-l border-outline-variant pl-xl">
<p class="font-headline-md text-headline-md text-primary">88%</p>
<p class="font-caption text-caption text-outline">Avg. Completion</p>
</div>
<div class="border-l border-outline-variant pl-xl">
<p class="font-headline-md text-headline-md text-primary">4.2m</p>
<p class="font-caption text-caption text-outline">Avg. Time Spent</p>
</div>
</div>
</div>
<!-- Empty State / Add New -->
<div class="border border-dashed border-outline-variant rounded-lg p-lg flex flex-col items-center justify-center text-center hover:border-primary transition-colors cursor-pointer">
<span class="material-symbols-outlined text-outline-variant mb-md text-[32px]" data-icon="add_circle">add_circle</span>
<p class="font-label-md text-label-md text-on-surface-variant">Start a New Template</p>
</div>
</div>
<!-- Footer Info -->
<footer class="mt-xxl pt-lg border-t border-outline-variant flex justify-between items-center text-on-surface-variant">
<div class="flex gap-lg">
<a class="font-caption text-caption hover:text-primary transition-colors" href="#">Privacy Policy</a>
<a class="font-caption text-caption hover:text-primary transition-colors" href="#">Terms of Service</a>
</div>
<p class="font-caption text-caption">© 2023 TestCenter. System status: Operational</p>
</footer>
</main>
</div>
</body></html>

<!-- User Dashboard - My Quizzes -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sign in to TestCenter</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "background": "#f9f9f9",
                        "on-tertiary-container": "#9c9d9e",
                        "on-surface-variant": "#49473f",
                        "on-error": "#ffffff",
                        "inverse-primary": "#cbc6bd",
                        "on-primary": "#ffffff",
                        "primary-fixed-dim": "#cbc6bd",
                        "on-tertiary-fixed": "#1a1c1c",
                        "error": "#ba1a1a",
                        "surface-container-highest": "#e2e2e2",
                        "outline": "#7a776e",
                        "inverse-surface": "#2f3131",
                        "secondary-fixed": "#e2e2e2",
                        "on-secondary-fixed": "#1a1c1c",
                        "on-background": "#1a1c1c",
                        "on-primary-fixed": "#1d1c16",
                        "tertiary-fixed": "#e2e2e2",
                        "surface-bright": "#f9f9f9",
                        "error-container": "#ffdad6",
                        "primary": "#21201a",
                        "outline-variant": "#cbc6bc",
                        "on-secondary-container": "#5f6161",
                        "surface-container": "#eeeeee",
                        "primary-fixed": "#e7e2d9",
                        "primary-container": "#37352f",
                        "secondary-container": "#dcdddd",
                        "secondary": "#5d5f5f",
                        "tertiary": "#1e2020",
                        "surface": "#f9f9f9",
                        "surface-container-lowest": "#ffffff",
                        "secondary-fixed-dim": "#c6c6c7",
                        "on-tertiary": "#ffffff",
                        "surface-container-low": "#f4f3f3",
                        "on-error-container": "#93000a",
                        "on-secondary-fixed-variant": "#454747",
                        "on-secondary": "#ffffff",
                        "surface-container-high": "#e8e8e8",
                        "tertiary-container": "#333535",
                        "on-surface": "#1a1c1c",
                        "inverse-on-surface": "#f1f1f1",
                        "tertiary-fixed-dim": "#c6c6c7",
                        "surface-dim": "#dadada",
                        "on-primary-fixed-variant": "#494740",
                        "surface-tint": "#615e57",
                        "on-primary-container": "#a19d95",
                        "on-tertiary-fixed-variant": "#454747",
                        "surface-variant": "#e2e2e2"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "spacing": {
                        "xxl": "64px",
                        "gutter": "24px",
                        "sm": "8px",
                        "xs": "4px",
                        "md": "16px",
                        "container-max": "900px",
                        "unit": "4px",
                        "lg": "24px",
                        "xl": "40px"
                    },
                    "fontFamily": {
                        "headline-lg": ["Inter"],
                        "label-md": ["Inter"],
                        "caption": ["Inter"],
                        "headline-xl": ["Inter"],
                        "body-md": ["Inter"],
                        "headline-sm": ["Inter"],
                        "body-lg": ["Inter"],
                        "label-sm": ["Inter"],
                        "headline-md": ["Inter"]
                    },
                    "fontSize": {
                        "headline-lg": ["30px", {"lineHeight": "1.3", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                        "label-md": ["14px", {"lineHeight": "1.4", "fontWeight": "500"}],
                        "caption": ["12px", {"lineHeight": "1.4", "fontWeight": "400"}],
                        "headline-xl": ["40px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                        "body-md": ["15px", {"lineHeight": "1.6", "fontWeight": "400"}],
                        "headline-sm": ["20px", {"lineHeight": "1.4", "fontWeight": "600"}],
                        "body-lg": ["17px", {"lineHeight": "1.6", "fontWeight": "400"}],
                        "label-sm": ["12px", {"lineHeight": "1.4", "letterSpacing": "0.03em", "fontWeight": "500"}],
                        "headline-md": ["24px", {"lineHeight": "1.4", "fontWeight": "600"}]
                    }
                },
            },
        }
    </script>
<style>
        body {
            background-color: #F7F7F7;
        }
        .invisible-input {
            background: transparent;
            border: none;
            border-bottom: 1px solid #EBEBEB;
            border-radius: 0;
            padding-left: 0;
            padding-right: 0;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
        .invisible-input:focus, .invisible-input:hover {
            outline: none;
            border: 1px solid #EBEBEB;
            box-shadow: none;
            padding-left: 8px;
            padding-right: 8px;
        }
        .invisible-input::placeholder {
            color: #73726E;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
</head>
<body class="flex items-center justify-center min-h-screen font-body-md text-on-surface">
<!-- Primary Canvas Container -->
<main class="w-full max-w-[400px] mx-md">
<!-- Login Card -->
<section class="bg-surface-container-lowest border border-outline-variant rounded-lg p-xxl flex flex-col gap-xl">
<!-- Brand & Header -->
<header class="flex flex-col items-center gap-md">
<div class="flex items-center gap-xs">
<span class="material-symbols-outlined text-primary" data-icon="blur_on">blur_on</span>
<span class="font-headline-sm text-headline-sm font-bold text-primary">TestCenter</span>
</div>
<h1 class="font-headline-sm text-headline-sm text-on-surface text-center">Sign in to your account</h1>
</header>
<!-- Authentication Form -->
<form class="flex flex-col gap-lg">
<!-- Email Field -->
<div class="flex flex-col gap-xs">
<label class="font-label-sm text-label-sm text-on-surface-variant" for="email">Email</label>
<input class="invisible-input h-xl font-body-md text-on-surface" id="email" name="email" placeholder="name@company.com" type="email"/>
</div>
<!-- Password Field -->
<div class="flex flex-col gap-xs">
<div class="flex justify-between items-center">
<label class="font-label-sm text-label-sm text-on-surface-variant" for="password">Password</label>
<a class="font-label-sm text-label-sm text-secondary hover:text-primary transition-colors" href="#">Forgot?</a>
</div>
<input class="invisible-input h-xl font-body-md text-on-surface" id="password" name="password" placeholder="••••••••" type="password"/>
</div>
<!-- Primary Action -->
<div class="pt-md">
<button class="w-full bg-primary-container text-on-primary font-label-md text-label-md h-[44px] rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center" type="submit">
                        Sign In
                    </button>
</div>
</form>
<!-- Footer Navigation -->
<footer class="flex flex-col items-center gap-md">
<div class="w-full border-t border-outline-variant opacity-50"></div>
<a class="font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-low px-md py-sm rounded transition-colors duration-150" href="#">
                    Don't have an account? Sign up
                </a>
</footer>
</section>
<!-- Optional Bottom Branding/Meta -->
<aside class="mt-xl flex justify-center gap-lg">
<span class="font-caption text-caption text-on-tertiary-container">Privacy Policy</span>
<span class="font-caption text-caption text-on-tertiary-container">Terms of Service</span>
<span class="font-caption text-caption text-on-tertiary-container">© 2024 TestCenter Inc.</span>
</aside>
</main>
<!-- Visual Anchor Background Decoration (Minimalist Texture) -->
<div class="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
<div class="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.03]">
<svg viewbox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
<circle class="text-primary" cx="50" cy="50" fill="none" r="40" stroke="currentColor" stroke-width="0.5"></circle>
<path class="text-primary" d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" stroke-width="0.5"></path>
</svg>
</div>
</div>
</body></html>

<!-- Login - Untitled Quiz -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "background": "#f9f9f9",
                    "tertiary-fixed-dim": "#c6c6c7",
                    "surface-container-high": "#e8e8e8",
                    "on-surface-variant": "#49473f",
                    "on-primary-fixed": "#1d1c16",
                    "surface-container-lowest": "#ffffff",
                    "surface-container-low": "#f4f3f3",
                    "surface-tint": "#615e57",
                    "surface-container": "#eeeeee",
                    "on-surface": "#1a1c1c",
                    "secondary-fixed": "#e2e2e2",
                    "on-tertiary-fixed": "#1a1c1c",
                    "on-error": "#ffffff",
                    "on-primary-container": "#a19d95",
                    "secondary-fixed-dim": "#c6c6c7",
                    "tertiary": "#1e2020",
                    "surface-bright": "#f9f9f9",
                    "outline": "#7a776e",
                    "secondary": "#5d5f5f",
                    "secondary-container": "#dcdddd",
                    "on-secondary-fixed-variant": "#454747",
                    "inverse-on-surface": "#f1f1f1",
                    "on-error-container": "#93000a",
                    "inverse-primary": "#cbc6bd",
                    "tertiary-fixed": "#e2e2e2",
                    "on-tertiary-fixed-variant": "#454747",
                    "on-primary": "#ffffff",
                    "outline-variant": "#cbc6bc",
                    "tertiary-container": "#333535",
                    "primary-fixed-dim": "#cbc6bd",
                    "on-background": "#1a1c1c",
                    "on-secondary-fixed": "#1a1c1c",
                    "inverse-surface": "#2f3131",
                    "primary-fixed": "#e7e2d9",
                    "on-secondary-container": "#5f6161",
                    "surface-dim": "#dadada",
                    "primary-container": "#37352f",
                    "error": "#ba1a1a",
                    "surface": "#f9f9f9",
                    "on-secondary": "#ffffff",
                    "surface-variant": "#e2e2e2",
                    "on-tertiary": "#ffffff",
                    "error-container": "#ffdad6",
                    "on-tertiary-container": "#9c9d9e",
                    "surface-container-highest": "#e2e2e2",
                    "primary": "#21201a",
                    "on-primary-fixed-variant": "#494740"
            },
            "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "0.75rem"
            },
            "spacing": {
                    "xxl": "64px",
                    "xs": "4px",
                    "md": "16px",
                    "gutter": "24px",
                    "xl": "40px",
                    "lg": "24px",
                    "unit": "4px",
                    "container-max": "900px",
                    "sm": "8px"
            },
            "fontFamily": {
                    "label-md": ["Inter"],
                    "headline-lg": ["Inter"],
                    "label-sm": ["Inter"],
                    "body-lg": ["Inter"],
                    "body-md": ["Inter"],
                    "caption": ["Inter"],
                    "headline-xl": ["Inter"],
                    "headline-sm": ["Inter"],
                    "headline-md": ["Inter"]
            },
            "fontSize": {
                    "label-md": ["14px", {"lineHeight": "1.4", "fontWeight": "500"}],
                    "headline-lg": ["30px", {"lineHeight": "1.3", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                    "label-sm": ["12px", {"lineHeight": "1.4", "letterSpacing": "0.03em", "fontWeight": "500"}],
                    "body-lg": ["17px", {"lineHeight": "1.6", "fontWeight": "400"}],
                    "body-md": ["15px", {"lineHeight": "1.6", "fontWeight": "400"}],
                    "caption": ["12px", {"lineHeight": "1.4", "fontWeight": "400"}],
                    "headline-xl": ["40px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                    "headline-sm": ["20px", {"lineHeight": "1.4", "fontWeight": "600"}],
                    "headline-md": ["24px", {"lineHeight": "1.4", "fontWeight": "600"}]
            }
          },
        },
      }
    </script>
<style>
        body {
            background-color: #FFFFFF;
            color: #37352F;
            -webkit-font-smoothing: antialiased;
        }
        .border-subtle {
            border: 1px solid #EBEBEB;
        }
        .canvas-centered {
            max-width: 900px;
            margin-left: auto;
            margin-right: auto;
        }
    </style>
</head>
<body class="bg-surface-container-lowest font-body-md text-on-surface">
<!-- TopNavBar -->
<header class="bg-surface dark:bg-surface-container border-b border-outline-variant dark:border-outline docked full-width top-0 sticky z-50">
<nav class="flex justify-between items-center w-full px-xxl max-w-[900px] mx-auto h-16">
<div class="text-headline-sm font-headline-sm font-bold text-primary dark:text-primary-fixed">TestCenter</div>
<div class="hidden md:flex items-center gap-xl">
<a class="text-secondary dark:text-on-surface-variant text-body-md font-body-md hover:bg-surface-container-low dark:hover:bg-surface-container-high px-sm py-xs transition-all duration-150 rounded" href="#">Features</a>
<a class="text-secondary dark:text-on-surface-variant text-body-md font-body-md hover:bg-surface-container-low dark:hover:bg-surface-container-high px-sm py-xs transition-all duration-150 rounded" href="#">Pricing</a>
</div>
<div class="flex items-center gap-md">
<button class="text-secondary dark:text-on-surface-variant text-body-md font-body-md hover:bg-surface-container-low dark:hover:bg-surface-container-high px-md py-sm rounded transition-all duration-150 active:scale-95">Log in</button>
<button class="bg-primary-container text-on-primary font-body-md px-md py-sm rounded active:scale-95 transition-all duration-150">Sign up</button>
</div>
</nav>
</header>
<main>
<!-- Hero Section -->
<section class="py-xxl px-xxl canvas-centered text-center">
<div class="flex flex-col items-center gap-lg">
<h1 class="text-headline-xl font-headline-xl text-primary max-w-[600px]">
                    Create Tests Effortlessly
                </h1>
<p class="text-body-lg font-body-lg text-secondary max-w-[600px]">
                    A high-performance workspace designed for clarity. Build complex assessments, distribute them securely, and analyze results with systematic precision.
                </p>
<div class="mt-lg">
<button class="bg-primary-container text-on-primary px-xl py-md font-label-md text-label-md rounded active:scale-95 transition-all duration-150">
                        Start Creating for Free
                    </button>
</div>
</div>
</section>
<!-- Visual Anchor (Hero Image Replacement) -->
<section class="px-xxl canvas-centered mb-xxl">
<div class="w-full aspect-video border-subtle bg-surface-container-low rounded-xl overflow-hidden">
<img class="w-full h-full object-cover grayscale-[0.5] opacity-90" data-alt="A clean, high-angle view of a minimalist workspace featuring a sleek laptop on a white desk surrounded by structured journals and a single black pen. The lighting is diffused and bright, reflecting a light-mode aesthetic with high-key whites and subtle grey tones. The composition is orderly and calm, emphasizing the digital essentialism philosophy with a professional, intellectual atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp9Ym7pSB-vmj4ZLGFMC06f7UnX6wPVpNUAeOZktSDGxBp8Y4NjOdecRdD_m7olvehKSrzkXv8l8KncvphaF5gQoFNeD9Ea8IyNyd69tktVIRmdeOSaNiCjewsr3IA5CGdCvY8wIhtcQZ8GyJu0oCNYoSvh-s2rC946BIR3j45w9DMdIdSaRh4sy-xzfpGU41Oye0JhnHbwfIL7ISXIywikNY_yjOHEtsXHOPpigdMfSeUP0eM5PFaxcTc0OUZ2wV7DGEwnBMOS41m"/>
</div>
</section>
<!-- Features Section -->
<section class="px-xxl py-xxl canvas-centered">
<div class="grid grid-cols-1 md:grid-cols-3 gap-lg">
<!-- Card 1 -->
<div class="border-subtle p-lg flex flex-col gap-md transition-colors hover:bg-surface-container-low">
<div class="flex items-center justify-center w-10 h-10 rounded bg-surface-container">
<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 0;">edit_note</span>
</div>
<h3 class="text-headline-sm font-headline-sm text-primary">Intuitive Editor</h3>
<p class="text-body-md font-body-md text-on-surface-variant">
                        Our markdown-inspired editor stays out of your way, letting you focus entirely on the content of your questions.
                    </p>
</div>
<!-- Card 2 -->
<div class="border-subtle p-lg flex flex-col gap-md transition-colors hover:bg-surface-container-low">
<div class="flex items-center justify-center w-10 h-10 rounded bg-surface-container">
<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 0;">analytics</span>
</div>
<h3 class="text-headline-sm font-headline-sm text-primary">Clear Analytics</h3>
<p class="text-body-md font-body-md text-on-surface-variant">
                        Visualize candidate performance with high-density data visualizations that strip away the noise and reveal truth.
                    </p>
</div>
<!-- Card 3 -->
<div class="border-subtle p-lg flex flex-col gap-md transition-colors hover:bg-surface-container-low">
<div class="flex items-center justify-center w-10 h-10 rounded bg-surface-container">
<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 0;">verified_user</span>
</div>
<h3 class="text-headline-sm font-headline-sm text-primary">Secure Delivery</h3>
<p class="text-body-md font-body-md text-on-surface-variant">
                        Ensure the integrity of your tests with robust access controls and time-limited session management.
                    </p>
</div>
</div>
</section>
<!-- Aesthetic Bento Break -->
<section class="px-xxl py-xxl canvas-centered">
<div class="grid grid-cols-1 md:grid-cols-12 gap-gutter h-auto md:h-[400px]">
<div class="md:col-span-8 border-subtle p-xxl flex flex-col justify-end bg-surface-container-lowest">
<h4 class="text-headline-md font-headline-md mb-md text-primary">Engineered for Thinking.</h4>
<p class="text-body-md font-body-md text-on-surface-variant max-w-[400px]">
                        The interface is an extension of your thought process. No clutter, no distractions, just pure productivity.
                    </p>
</div>
<div class="md:col-span-4 border-subtle bg-surface-container-low flex items-center justify-center p-lg relative overflow-hidden">
<img class="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-20" data-alt="A close-up shot of a modern tablet display showing a clean digital dashboard with minimalist line graphs and neat typography. The device is held by hands against a neutral, soft grey background. The lighting is crisp and cool, accentuating the sharp edges and professional aesthetic of the software interface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0pOuP0cXIBdWtTnGwN5EcXM3pLr0ZU3pOlRB7cQiaSnbrM4jpGvpjQX8SnWgXd8OsZzOp5rRE6HJ6Okh1SL-elspecRuMKMchIm3smJIItj-S8RA3vX2k-o-BWxMj7FMNY15MooCK-7YamDYhUcc3Lo12cJgnEfDCtvQvPrjnyg9PATOlCHsNAsR4U8zExwG1YJKXKCA7WsFHlG6_7dVnJ4jeX_aRoA4GD4tWIewcE9sdOdSNbwsA0caRIK0C_jk_9gPUQk6IaX97"/>
<span class="material-symbols-outlined text-[64px] text-primary opacity-20">grid_view</span>
</div>
</div>
</section>
</main>
<!-- Footer -->
<footer class="bg-surface dark:bg-surface-container border-t border-outline-variant dark:border-outline docked full-width bottom mt-xxl">
<div class="flex flex-col md:flex-row justify-between items-center w-full px-xxl py-xl max-w-[900px] mx-auto gap-md">
<div class="text-label-md font-label-md font-bold text-primary dark:text-primary-fixed">TestCenter</div>
<div class="flex gap-lg">
<a class="text-secondary dark:text-on-surface-variant text-label-sm font-label-sm hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#">Terms</a>
<a class="text-secondary dark:text-on-surface-variant text-label-sm font-label-sm hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#">Privacy</a>
<a class="text-secondary dark:text-on-surface-variant text-label-sm font-label-sm hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#">Contact</a>
</div>
<div class="text-secondary dark:text-on-surface-variant text-label-sm font-label-sm">© 2024 TestCenter. Built for clarity.</div>
</div>
</footer>
</body></html>

<!-- Untitled Quiz - Landing Page -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        body {
            font-family: 'Inter', sans-serif;
            -webkit-font-smoothing: antialiased;
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "tertiary-container": "#333535",
                        "secondary-container": "#dcdddd",
                        "tertiary-fixed-dim": "#c6c6c7",
                        "surface-container-lowest": "#ffffff",
                        "surface-bright": "#f9f9f9",
                        "on-secondary-fixed-variant": "#454747",
                        "on-tertiary-container": "#9c9d9e",
                        "tertiary-fixed": "#e2e2e2",
                        "secondary-fixed": "#e2e2e2",
                        "on-tertiary-fixed": "#1a1c1c",
                        "on-primary-fixed-variant": "#494740",
                        "on-error-container": "#93000a",
                        "tertiary": "#1e2020",
                        "inverse-primary": "#cbc6bd",
                        "surface-variant": "#e2e2e2",
                        "primary-container": "#37352f",
                        "on-surface-variant": "#49473f",
                        "on-tertiary": "#ffffff",
                        "surface": "#f9f9f9",
                        "on-surface": "#1a1c1c",
                        "on-tertiary-fixed-variant": "#454747",
                        "outline-variant": "#cbc6bc",
                        "on-primary-container": "#a19d95",
                        "inverse-on-surface": "#f1f1f1",
                        "on-secondary": "#ffffff",
                        "error-container": "#ffdad6",
                        "error": "#ba1a1a",
                        "surface-container-highest": "#e2e2e2",
                        "on-secondary-fixed": "#1a1c1c",
                        "secondary": "#5d5f5f",
                        "on-background": "#1a1c1c",
                        "inverse-surface": "#2f3131",
                        "on-error": "#ffffff",
                        "on-secondary-container": "#5f6161",
                        "primary-fixed-dim": "#cbc6bd",
                        "primary-fixed": "#e7e2d9",
                        "surface-container": "#eeeeee",
                        "outline": "#7a776e",
                        "background": "#f9f9f9",
                        "surface-tint": "#615e57",
                        "primary": "#21201a",
                        "surface-container-low": "#f4f3f3",
                        "surface-container-high": "#e8e8e8",
                        "secondary-fixed-dim": "#c6c6c7",
                        "on-primary-fixed": "#1d1c16",
                        "on-primary": "#ffffff",
                        "surface-dim": "#dadada"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "spacing": {
                        "sm": "8px",
                        "gutter": "24px",
                        "xs": "4px",
                        "md": "16px",
                        "container-max": "900px",
                        "xxl": "64px",
                        "unit": "4px",
                        "lg": "24px",
                        "xl": "40px"
                    },
                    "fontFamily": {
                        "caption": ["Inter"],
                        "headline-lg": ["Inter"],
                        "body-lg": ["Inter"],
                        "label-md": ["Inter"],
                        "body-md": ["Inter"],
                        "label-sm": ["Inter"],
                        "headline-sm": ["Inter"],
                        "headline-md": ["Inter"],
                        "headline-xl": ["Inter"]
                    },
                    "fontSize": {
                        "caption": ["12px", {"lineHeight": "1.4", "fontWeight": "400"}],
                        "headline-lg": ["30px", {"lineHeight": "1.3", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                        "body-lg": ["17px", {"lineHeight": "1.6", "fontWeight": "400"}],
                        "label-md": ["14px", {"lineHeight": "1.4", "fontWeight": "500"}],
                        "body-md": ["15px", {"lineHeight": "1.6", "fontWeight": "400"}],
                        "label-sm": ["12px", {"lineHeight": "1.4", "letterSpacing": "0.03em", "fontWeight": "500"}],
                        "headline-sm": ["20px", {"lineHeight": "1.4", "fontWeight": "600"}],
                        "headline-md": ["24px", {"lineHeight": "1.4", "fontWeight": "600"}],
                        "headline-xl": ["40px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700"}]
                    }
                },
            },
        }
    </script>
</head>
<body class="bg-surface-container-lowest text-on-surface">
<!-- TopAppBar -->
<header class="sticky top-0 z-50 bg-surface dark:bg-inverse-surface border-b border-outline-variant dark:border-outline">
<div class="flex justify-between items-center h-16 w-full px-gutter max-w-container-max mx-auto">
<!-- Left: Title -->
<div class="flex items-center gap-md">
<span class="font-headline-sm text-headline-sm text-primary dark:text-primary-fixed-dim font-bold">TestCenter</span>
</div>
<!-- Center: Progress -->
<div class="hidden md:flex flex-col items-center justify-center flex-1 max-w-[240px]">
<span class="font-label-md text-label-md text-secondary mb-xs">Question 3 of 10</span>
<div class="w-full bg-surface-container h-[2px] overflow-hidden">
<div class="bg-primary h-full w-[30%] transition-all duration-300"></div>
</div>
</div>
<!-- Right: Action -->
<div class="flex items-center justify-end">
<button class="px-md py-sm bg-surface border border-outline-variant text-on-surface hover:bg-surface-container-low transition-colors duration-200 text-label-md font-label-md">
                    Pause &amp; Save
                </button>
</div>
</div>
</header>
<!-- Main Content Canvas -->
<main class="max-w-container-max mx-auto px-gutter py-xxl min-h-[calc(100vh-128px)]">
<article class="flex flex-col gap-xl">
<!-- Question Heading -->
<section>
<h1 class="font-headline-md text-headline-md text-primary leading-tight">
                    Which of the following best describes the optical principle of "overshoot" in typeface design?
                </h1>
</section>
<!-- Diagnostic Visualization (Optional High-End UI Element) -->
<div class="w-full h-64 bg-surface-container-low border border-outline-variant flex items-center justify-center relative overflow-hidden group">
<img class="w-full h-full object-cover opacity-10" data-alt="A clean technical diagram of typography elements shown in a minimalist studio setting. The lighting is soft and clinical, highlighting the precise curves of a large sans-serif capital letter O. Fine red architectural lines indicate the baseline and x-height, demonstrating the subtle extension of curved forms beyond the standard guides. The overall aesthetic is professional, monochrome, and focuses on high-precision graphic design principles." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFOQep9B0POtYRnSUdBU7CVvddJqdz6sJpdJKsolSzWDxw0I3mFFKeAPP_k8DvYn73Tp7BZ70t6soLh7aAn91Y6d-fAsqxj22Ay5jTUA5zxOM0jjFde8hoYzMhMfiRUTMV-JZhxwUDESJj61iI1MMkcYml_m147VPN8-qcUcRCvcNqCKbSNcFPdXmTntCDTXKhfhqf2ibVdYYS65SRXV31EisDK3yOb2Jld6z14-__vevYYgimhQhM5yoCHEjC9u5kqdm9mFQSyh7-"/>
<div class="absolute inset-0 flex items-center justify-center pointer-events-none">
<span class="text-[180px] font-bold text-primary select-none opacity-20">O</span>
<div class="absolute w-full border-b border-dashed border-outline opacity-30 top-[20%]"></div>
<div class="absolute w-full border-b border-dashed border-outline opacity-30 bottom-[20%]"></div>
</div>
</div>
<!-- Options List -->
<section class="flex flex-col border border-outline-variant">
<!-- Option 1 -->
<label class="group flex items-center p-md cursor-pointer hover:bg-surface-container-low transition-colors border-b border-outline-variant last:border-b-0">
<div class="relative flex items-center justify-center w-md h-md mr-md">
<input class="sr-only" name="quiz-option" type="radio"/>
<div class="w-[14px] h-[14px] rounded-full border border-outline-variant group-hover:border-primary transition-colors"></div>
</div>
<span class="font-body-md text-body-md text-on-surface">The practice of increasing character width to improve legibility at small sizes.</span>
</label>
<!-- Option 2 -->
<label class="group flex items-center p-md cursor-pointer hover:bg-surface-container-low transition-colors border-b border-outline-variant last:border-b-0">
<div class="relative flex items-center justify-center w-md h-md mr-md">
<input class="sr-only" name="quiz-option" type="radio"/>
<div class="w-[14px] h-[14px] rounded-full border border-outline-variant group-hover:border-primary transition-colors"></div>
</div>
<span class="font-body-md text-body-md text-on-surface">The horizontal distance between two specific glyphs to balance white space.</span>
</label>
<!-- Option 3 (Selected) -->
<label class="group flex items-center p-md cursor-pointer bg-surface-container-low border-b border-outline-variant last:border-b-0">
<div class="relative flex items-center justify-center w-md h-md mr-md">
<input checked="" class="sr-only" name="quiz-option" type="radio"/>
<div class="w-[14px] h-[14px] rounded-full border border-primary-container bg-primary-container"></div>
<div class="absolute w-[4px] h-[4px] rounded-full bg-white"></div>
</div>
<span class="font-body-md text-body-md text-primary font-bold">The slight extension of rounded or pointed characters beyond the baseline or x-height to appear optically aligned.</span>
</label>
<!-- Option 4 -->
<label class="group flex items-center p-md cursor-pointer hover:bg-surface-container-low transition-colors border-b border-outline-variant last:border-b-0">
<div class="relative flex items-center justify-center w-md h-md mr-md">
<input class="sr-only" name="quiz-option" type="radio"/>
<div class="w-[14px] h-[14px] rounded-full border border-outline-variant group-hover:border-primary transition-colors"></div>
</div>
<span class="font-body-md text-body-md text-on-surface">The adjustment of stroke thickness to compensate for visual blooming in print processes.</span>
</label>
</section>
</article>
</main>
<!-- Bottom Navigation Shell -->
<nav class="fixed bottom-0 left-0 right-0 bg-surface dark:bg-inverse-surface border-t border-outline-variant dark:border-outline z-50">
<div class="flex justify-between items-center px-gutter py-md max-w-container-max mx-auto h-16">
<!-- Previous Action -->
<button class="flex items-center gap-xs text-secondary hover:bg-surface-container-low px-md py-sm rounded transition-colors active:scale-95 duration-150">
<span class="material-symbols-outlined text-[20px]" data-icon="arrow_back">arrow_back</span>
<span class="font-label-md text-label-md">Previous</span>
</button>
<!-- Next Action -->
<button class="flex items-center gap-xs bg-primary-container text-on-primary px-lg py-sm rounded-lg hover:opacity-90 transition-all active:scale-95 duration-150">
<span class="font-label-md text-label-md font-bold">Next Question</span>
<span class="material-symbols-outlined text-[20px]" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
</nav>
<!-- Content padding for fixed footer -->
<div class="h-16"></div>
</body></html>

<!-- Student Quiz - Taking View -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "tertiary-fixed": "#e2e2e2",
                    "surface-container": "#eeeeee",
                    "on-surface-variant": "#49473f",
                    "on-primary-container": "#a19d95",
                    "tertiary-fixed-dim": "#c6c6c7",
                    "secondary-fixed": "#e2e2e2",
                    "surface-bright": "#f9f9f9",
                    "on-secondary-fixed-variant": "#454747",
                    "surface-variant": "#e2e2e2",
                    "outline-variant": "#cbc6bc",
                    "background": "#f9f9f9",
                    "on-primary": "#ffffff",
                    "tertiary": "#1e2020",
                    "secondary-fixed-dim": "#c6c6c7",
                    "on-error": "#ffffff",
                    "inverse-surface": "#2f3131",
                    "secondary-container": "#dcdddd",
                    "secondary": "#5d5f5f",
                    "primary": "#21201a",
                    "on-tertiary-container": "#9c9d9e",
                    "surface": "#f9f9f9",
                    "tertiary-container": "#333535",
                    "surface-tint": "#615e57",
                    "primary-container": "#37352f",
                    "on-error-container": "#93000a",
                    "outline": "#7a776e",
                    "surface-container-low": "#f4f3f3",
                    "surface-dim": "#dadada",
                    "on-surface": "#1a1c1c",
                    "surface-container-lowest": "#ffffff",
                    "inverse-primary": "#cbc6bd",
                    "primary-fixed": "#e7e2d9",
                    "on-tertiary": "#ffffff",
                    "inverse-on-surface": "#f1f1f1",
                    "error": "#ba1a1a",
                    "surface-container-highest": "#e2e2e2",
                    "on-secondary": "#ffffff",
                    "primary-fixed-dim": "#cbc6bd",
                    "surface-container-high": "#e8e8e8",
                    "on-primary-fixed-variant": "#494740",
                    "on-tertiary-fixed-variant": "#454747",
                    "on-secondary-fixed": "#1a1c1c",
                    "on-secondary-container": "#5f6161",
                    "on-background": "#1a1c1c",
                    "error-container": "#ffdad6",
                    "on-primary-fixed": "#1d1c16",
                    "on-tertiary-fixed": "#1a1c1c"
            },
            "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "0.75rem"
            },
            "spacing": {
                    "lg": "24px",
                    "md": "16px",
                    "xs": "4px",
                    "xl": "40px",
                    "gutter": "24px",
                    "unit": "4px",
                    "container-max": "900px",
                    "xxl": "64px",
                    "sm": "8px"
            },
            "fontFamily": {
                    "headline-sm": ["Inter"],
                    "caption": ["Inter"],
                    "headline-lg": ["Inter"],
                    "label-sm": ["Inter"],
                    "label-md": ["Inter"],
                    "headline-xl": ["Inter"],
                    "headline-md": ["Inter"],
                    "body-md": ["Inter"],
                    "body-lg": ["Inter"]
            },
            "fontSize": {
                    "headline-sm": ["20px", {"lineHeight": "1.4", "fontWeight": "600"}],
                    "caption": ["12px", {"lineHeight": "1.4", "fontWeight": "400"}],
                    "headline-lg": ["30px", {"lineHeight": "1.3", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                    "label-sm": ["12px", {"lineHeight": "1.4", "letterSpacing": "0.03em", "fontWeight": "500"}],
                    "label-md": ["14px", {"lineHeight": "1.4", "fontWeight": "500"}],
                    "headline-xl": ["40px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                    "headline-md": ["24px", {"lineHeight": "1.4", "fontWeight": "600"}],
                    "body-md": ["15px", {"lineHeight": "1.6", "fontWeight": "400"}],
                    "body-lg": ["17px", {"lineHeight": "1.6", "fontWeight": "400"}]
            }
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        body {
            background-color: #FFFFFF;
        }
    </style>
</head>
<body class="font-body-md text-on-surface">
<!-- TopNavBar -->
<header class="bg-surface docked full-width top-0 border-b border-outline-variant">
<div class="flex justify-between items-center w-full px-lg py-md max-w-container-max mx-auto">
<div class="font-headline-sm text-headline-sm font-bold text-primary">TestCenter</div>
<nav class="hidden md:flex gap-lg items-center">
<a class="font-body-md text-body-md text-on-surface-variant hover:bg-surface-container-low transition-colors px-sm py-xs" href="#">Drafts</a>
<a class="font-body-md text-body-md text-on-surface-variant hover:bg-surface-container-low transition-colors px-sm py-xs" href="#">Templates</a>
<a class="font-body-md text-body-md text-on-surface-variant hover:bg-surface-container-low transition-colors px-sm py-xs" href="#">Explore</a>
</nav>
<div class="flex gap-md items-center">
<button class="font-label-md text-label-md px-md py-sm border border-outline-variant hover:bg-surface-container-low transition-colors">Log in</button>
<button class="font-label-md text-label-md px-md py-sm bg-primary-container text-on-primary hover:opacity-90 transition-opacity">Create Quiz</button>
</div>
</div>
</header>
<main class="max-w-container-max mx-auto px-lg py-xxl">
<!-- Score Header -->
<section class="mb-xl text-center md:text-left">
<h1 class="font-headline-xl text-headline-xl text-primary mb-xs">85%</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant">You answered 17 out of 20 questions correctly</p>
</section>
<!-- Action Row -->
<section class="flex flex-col sm:flex-row gap-md mb-xxl border-b border-outline-variant pb-xl">
<button class="px-lg py-md bg-primary-container text-on-primary font-label-md text-label-md hover:opacity-90 transition-all active:opacity-80">
                Back to Dashboard
            </button>
<button class="px-lg py-md border border-outline-variant text-primary font-label-md text-label-md hover:bg-surface-container-low transition-all active:opacity-80">
                Review Answers
            </button>
</section>
<!-- Question Review List -->
<section class="space-y-0">
<!-- Question Item Correct -->
<div class="py-xl border-b border-outline-variant flex gap-md items-start">
<span class="material-symbols-outlined text-primary mt-1" data-icon="check_circle">check_circle</span>
<div class="flex-1">
<h3 class="font-headline-sm text-headline-sm text-primary mb-sm">Which of the following best describes the optical principle of 'overshoot' in typeface design?</h3>
<div class="space-y-xs">
<p class="font-body-md text-body-md"><span class="text-on-surface-variant">Your Answer:</span> <span class="font-bold">Extending curved characters slightly beyond the baseline and cap height.</span></p>
<p class="font-caption text-caption text-on-primary-container">Correct Answer: Same as above</p>
</div>
</div>
</div>
<!-- Question Item Incorrect -->
<div class="py-xl border-b border-outline-variant flex gap-md items-start">
<span class="material-symbols-outlined text-primary mt-1" data-icon="cancel">cancel</span>
<div class="flex-1">
<h3 class="font-headline-sm text-headline-sm text-primary mb-sm">What is the primary function of a 'bento grid' in modern UI design?</h3>
<div class="space-y-xs">
<p class="font-body-md text-body-md"><span class="text-on-surface-variant">Your Answer:</span> <span class="font-bold">To create a perfectly symmetrical layout for textual content.</span></p>
<p class="font-caption text-caption text-on-primary-container">Correct Answer: To organize diverse content into modular, rectangular cells of varying sizes.</p>
</div>
</div>
</div>
<!-- Question Item Correct -->
<div class="py-xl border-b border-outline-variant flex gap-md items-start">
<span class="material-symbols-outlined text-primary mt-1" data-icon="check_circle">check_circle</span>
<div class="flex-1">
<h3 class="font-headline-sm text-headline-sm text-primary mb-sm">In the context of 'digital essentialism', what is the main goal of reducing UI complexity?</h3>
<div class="space-y-xs">
<p class="font-body-md text-body-md"><span class="text-on-surface-variant">Your Answer:</span> <span class="font-bold">To minimize cognitive load and focus on primary tasks.</span></p>
<p class="font-caption text-caption text-on-primary-container">Correct Answer: Same as above</p>
</div>
</div>
</div>
<!-- Question Item Correct -->
<div class="py-xl border-b border-outline-variant flex gap-md items-start">
<span class="material-symbols-outlined text-primary mt-1" data-icon="check_circle">check_circle</span>
<div class="flex-1">
<h3 class="font-headline-sm text-headline-sm text-primary mb-sm">Which CSS property is most commonly used to implement 'tonal layering' depth?</h3>
<div class="space-y-xs">
<p class="font-body-md text-body-md"><span class="text-on-surface-variant">Your Answer:</span> <span class="font-bold">Background-color</span></p>
<p class="font-caption text-caption text-on-primary-container">Correct Answer: Same as above</p>
</div>
</div>
</div>
</section>
<!-- Stats Bento Section -->
<section class="mt-xxl grid grid-cols-1 md:grid-cols-3 gap-md">
<div class="p-lg border border-outline-variant flex flex-col justify-between h-40">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Time Spent</span>
<div class="font-headline-md text-headline-md text-primary">12m 45s</div>
</div>
<div class="p-lg border border-outline-variant flex flex-col justify-between h-40">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Difficulty</span>
<div class="font-headline-md text-headline-md text-primary">Advanced</div>
</div>
<div class="p-lg border border-outline-variant flex flex-col justify-between h-40">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Percentile</span>
<div class="font-headline-md text-headline-md text-primary">Top 12%</div>
</div>
</section>
</main>
<!-- Footer -->
<footer class="border-t border-outline-variant mt-xxl">
<div class="flex flex-col md:flex-row justify-between items-center w-full px-lg py-xl max-w-container-max mx-auto">
<div class="font-caption text-caption text-on-surface-variant">© 2024 TestCenter. All rights reserved.</div>
<div class="flex gap-lg mt-md md:mt-0">
<a class="font-caption text-caption text-on-surface-variant hover:text-primary transition-colors underline" href="#">© 2024 TestCenter. All rights reserved.</a>
<a class="font-caption text-caption text-on-surface-variant hover:text-primary transition-colors underline" href="#">© 2024 TestCenter. All rights reserved.</a>
<a class="font-caption text-caption text-on-surface-variant hover:text-primary transition-colors underline" href="#">© 2024 TestCenter. All rights reserved.</a>
<a class="font-caption text-caption text-on-surface-variant hover:text-primary transition-colors underline" href="#">© 2024 TestCenter. All rights reserved.</a>
</div>
</div>
</footer>
</body></html>