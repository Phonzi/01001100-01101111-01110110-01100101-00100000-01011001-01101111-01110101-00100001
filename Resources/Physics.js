function distance_between(e1,e2){
  const x1 = parseInt(e1.vars["x"]);
  const y1 = parseInt(e1.vars["y"]);
  const h1 = parseInt(e1.vars["h"]);
  const w1 = parseInt(e1.vars["w"]);

  const x2 = parseInt(e2.vars["x"]);
  const y2 = parseInt(e2.vars["y"]);
  const h2 = parseInt(e2.vars["h"]);
  const w2 = parseInt(e2.vars["w"]);

  // Calculate center points
  const cx1 = x1 + (w1 / 2);
  const cy1 = y1 - (h1 / 2);
  const cx2 = x2 + (w2 / 2);
  const cy2 = y2 - (h2 / 2);
      
  dist=Math.sqrt((cx1 - cx2) ** 2 + (cy1 - cy2) ** 2)

  return dist;
}



function areTouching(e1, e2){
  const x1 = parseInt(e1.vars["x"]);
  const y1 = parseInt(e1.vars["y"]);
  const h1 = parseInt(e1.vars["h"]);
  const w1 = parseInt(e1.vars["w"]);

  const x2 = parseInt(e2.vars["x"]);
  const y2 = parseInt(e2.vars["y"]);
  const h2 = parseInt(e2.vars["h"]);
  const w2 = parseInt(e2.vars["w"]);

  // Calculate center points
  const cx1 = x1 + (w1 / 2);
  const cy1 = y1 - (h1 / 2);
  const cx2 = x2 + (w2 / 2);
  const cy2 = y2 - (h2 / 2);
      
  dist=Math.sqrt((cx1 - cx2) ** 2 + (cy1 - cy2) ** 2)

  // Check if center points are closer than the sum of the minimum width and height
  return dist < (Math.min(w1, h1)/2+Math.min(w2, h2))/2;
}




