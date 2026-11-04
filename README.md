# CCC181 Week 10: CampusConnect Mobile-First Login Page


React + TypeScript starter for the Week 10 group activity. The page is already
built. Your group's job is the **mobile-first CSS** and the **GitHub teamwork**.


## Run it


```bash
npm install
npm run dev          # open the local URL it prints
npm run dev:phone    # same, but your phone (same Wi-Fi) can open the Network URL
npm run build        # must finish with no errors before you submit
```


## Rules


- Edit only the CSS files in `src/styles/` (one member = one file). Do not edit `reset.css`.
- Plain CSS only. No Tailwind, Bootstrap, Material UI, styled-components, or any UI library.
- Phone styles first (no media query), then `min-width` queries only. Never `max-width`.
- Do not edit the `.tsx` files or rename classes. If you must, tell the group first.


## Group information (fill in)


| Item | Your answer |
| --- | --- |
| Group number | 8 |
| Section | ITB |
| Repository URL | https://github.com/charmbalabat-ctrl/ccc181-week10-group8 |


## Members (each member fills in their own row in their own commit)


| Member | Name | GitHub username | CSS file | What I did |
| --- | --- | --- | --- | --- |
| 1 (leader) | Balabat, Charm Angel | charmbalabat-ctrl | `base.css` | Experiment 0, then added the viewport meta tag to index.html. Styled the page layout and brand panel with CSS Grid, with one column on phones, 2 columns from 1024px, and a centered 1200px container from 1280px. Created the repo and added teammates. |
| 2 | Mendoza, Mary Stephanie R.| Stephan7e | `nav.css` | I styled the navigation bar with Flexbox, so the links are stacked at 48px tall on phones and sit in one row, with the brand on the left, from 768px. |
| 3 | De Gracia, Rafael O. | Rafaeldegracia23 | `form.css` | Styled the login card and form with Flexbox, with stacked 48px fields and buttons on phones. From 768px, the checkbox row and two bottom buttons sit side by side, and the card is capped at 32rem. |


## Experiment 0: the page without the viewport tag


What did the page look like in DevTools phone mode **before** adding the viewport meta tag?
What changed **after** adding it?


> Before the viewport tag in DevTools phone mode (iPhone SE), the page looked zoomed out and tiny. The text was hard to read, and the whole layout looked like a shrunken desktop page, even though it is built with React. This happens because, without the tag, mobile browsers pretend the screen is about 980px wide and then shrink the whole page to fit. Because of that, our phone CSS and our 768px and 1024px media queries did not behave the way we planned. After adding the viewport tag


## DevTools test results


| Width | What must be true | Pass? |
| --- | --- | --- |
| 360 px | 1 column. Nav links stacked and 48px tall. Options and buttons stacked. Footer in 1 column. No sideways scrollbar. | Yes |
| 768 px | Nav in one row (brand left, links right). Checkbox and link in one row. Two buttons side by side. | Yes |
| 1024 px | Brand panel and login card side by side. Footer in 3 columns. Heading is larger. | Yes |
| 1280 px | Content centered and stops at 1200px. | Yes |


### Breakpoints I observed


Using **Show media queries** and dragging slowly from 360 px to 1280 px, the layout changed at these exact widths:


>  768 px: the navigation turned into one row (brand on the left, links on the right). The checkbox and "Forgot password?" moved side by side, and the two bottom buttons went side by side.
>  1024 px: the brand panel and login card moved side by side in 2 columns. The footer changed to 3 columns, the heading became larger, and the extra list of perks appeared.
>  1280 px: the content stopped stretching and stayed centered at a maximum width of 1200 px.
>
> No width looked broken. From 360 px to 1280 px there was no sideways scrollbar, no text was cut off, and nothing overlapped.


Screenshots are in `screenshots/` as `360.png`, `768.png`, `1024.png`, `1280.png`.


## What our group learned (leader writes this last)


> We learned that mobile-first means building the phone layout first and then only adding extra layout as the screen gets wider, so we used `min-width` media queries and never undid our mobile styles. We saw that the viewport meta tag is what makes this work on phones, since the page looked tiny and zoomed out without it. Grid was good for the page layout and footer, while Flexbox was good for the navigation and form parts. We also learned to make tap targets at least 48 px, to style `:focus-visible` along with `:hover`, and to test at 360, 768, 1024 and 1280 px in DevTools. Working with separate branches, commits and reviewed pull requests helped us each edit our own CSS file without conflicts.
