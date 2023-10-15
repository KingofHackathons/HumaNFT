function graph = saveimg(fig)

fig = gcf;
exportgraphics(fig, "graph.png");
disp("Figure Saved");

