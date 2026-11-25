# TuningOne

Уебсайт за TuningOne — монтаж на автомобилно фолио и затъмняване на стъкла, София.

## Структура

```
├── index.html              # Основна страница
├── css/
│   └── style.css           # Стилове
├── js/
│   └── main.js             # Анимации, меню, услуги, галерия, форма за поръчка, AI чат
├── assets/images/
│   ├── brand/              # Лого
│   ├── hero/               # Фон на началната секция
│   ├── about/              # Снимка „За нас“
│   ├── services/           # Снимки към всяка услуга
│   ├── gallery/            # Галерия
│   └── reviews/            # Снимки на клиенти
├── server/                 # Backend за AI асистента (Express, хостван в Render)
└── robots.txt
```

## Локално стартиране

```bash
npx serve .
```

Backend-ът за AI чата е описан в [`server/README.md`](server/README.md). Адресът му се задава в `AI_BACKEND_URL` в `js/main.js`.

## След промяна в CSS или JS

Браузърите кешират `css/style.css` и `js/main.js`. След промяна обнови версията в `index.html`, за да видят посетителите новото веднага:

```bash
v=$(cat css/style.css js/main.js | md5sum | cut -c1-8)
sed -i "s|style.css?v=[^\"]*|style.css?v=$v|; s|main.js?v=[^\"]*|main.js?v=$v|" index.html
```

## Технологии

HTML5, CSS3, чист JavaScript · Montserrat (Google Fonts) · Tabler Icons · Node.js/Express за AI backend-а
