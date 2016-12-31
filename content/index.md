!Index

# My Personal Site (Experimental)

This site was generated offline using JavaScript.

source: <https://github.com/ctmakro/site>

dependencies:

- `npm install`
- GNUPlot (for SVG graphics)

<div align=center>
<plot
unset key
set title "sinc(x)"
plot [-10:10][-.5:1.2] sinc(x)=sin(pi*x)/(pi*x), sinc(x)
/>
</div>
