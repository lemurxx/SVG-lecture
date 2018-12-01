import '../style/map.less';

var tl = new TimelineMax();
  
var map = document.getElementById('map');
  
 


tl.to(map, 3,{
        attr: { viewBox: "400 100 100 100"}
      });
tl.to(map, 3, {
        attr: { viewBox: "100 30 100 100"}
      });
      tl.to(map, 3, {
        attr: { viewBox: "0 0 650.29 329.534"}
      });
      tl.to(map, 3, {
        attr: { viewBox: "335 112 10 10"}
      });
    tl.to(map, 60, {delay: 1,
        attr: { viewBox: "-5000 -5000 10500 10500"}
      });
  

  

tl.play();
   