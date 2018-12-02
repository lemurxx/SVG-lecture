import '../style/word-cloud.less';
import './d3-cloud.js';

var text = 
   "állj, álarc, alul, állás, állat, állomás, ballag, bal, billeg, bámul, belső, bólint, bölcső, csalán, Csilla, cseles, csaló, dallam, elem, ellenség, ellenőrző, előtt, felleg, fullad, felnőtt, gallér, galamb, Gabriella, Göncölszekér, Gellért, gyalu, hallotta, hol, hull, halk, holló, háló, halpikkely, hüllő, illat, Ilona, illik, istálló, jelez, jellemző, jelmez, jelvény, Jolán, Júlia, július, kamilla, kalap, kapcsoló, karol, kell, kellemes, kiáltás, kiállítás, kilenc, kilogramm, kolbász, költő, különben, Lilla, lila, madártoll, malom, megálló, meleg, mellett, mellény, nulla, nyílik, nyúlik, olló, palota, pillangó, pillanat, roller, sikál, szalag, szálló, szálloda, szitál, tollbamondás, tolvaj, váll, válogat, vasal, vélemény, világ, villa, villám, villog, víziló, zálog, ülés";

var $ = (window as any).$;
 
    $('#source').change(function() {
      var text = $('#source').val().replace(/\.|\!|\:|\(|\)|\,/g,' ');
     
      var arr = text.split(' ').filter(function(w){return w.length > 2});
      let wordsObj = _.groupBy(arr);
      let wordsArr = [];
      for (let w in wordsObj) {
        wordsArr.push({
          text: w,
          size:wordsObj[w].length
        })
      }
        Cloud.init(1, "body", wordsArr);
    })
    var words = text.split(", ").map(function(w) {
      return {
        text: w,
        size: Math.random() * 30
      }
    });


    (window as any).Cloud = (function() {



      var zoomin = function(words) {
        zoom += 0.1;
        init(zoom, "body", words);
      }

      var zoomout = function() {
        zoom -= 0.1;
        init(zoom, "body", words);
      }

      var refresh = function() {
        zoom = 1;
        init(zoom, "body", words);
      }
      
      var zoom = 1;

      var init = function(zoom, wrapperelement, source) {
        $("#cloud").empty();

        
        var width = $(wrapperelement).width();
        var height =$(wrapperelement).height() * 0.8;
        var words = source;

        var sum = words.reduce(function(a, b) {
          return a += b.size;
        }, 0);
        
        var length = words.length;

        var corrector; 
       corrector =  //determined by experiments only
            Math.sqrt(length *  4) * 100;
       

        words = words.map(function(el) {
          return {
            text: el.text,
            size: el.size / sum * corrector * zoom
          };

        });
        
          var sum2 = words.reduce(function(a, b) {
          return a += b.size;
        }, 0);
        
      

        var fill = d3.scale.category20();
        var layout = d3.layout.cloud()
        .size([width, height])
          .words(words)
          .padding(2)
          .rotate(function() {
            
            return ~~(Math.random() * 2) * 90 - 45; //word rotation
          })
          .font("Impact")
          .fontSize(function(d) {
            return d.size;
          })
          .on("end", draw);
        layout.start();

        function draw(words) {
          d3.select("#cloud").append("svg").attr("viewBox", "0,0," + width + "," + height)
            .attr("width", layout.size()[0])
            .attr("height", layout.size()[1])
            .attr("preserveAspectRatio","xMinYMin")
            .append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .transition()
            .style("font-size", function(d) {
              return d.size + "px";
            })
            .style("font-family", "Impact")
            .style("fill", function(d, i) {
              return fill(i);
            })
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) {
              return d.text;
            });

          layout.stop();

          $("svg").removeAttr("width").removeAttr("height");
          $("svg").attr("width", "100%").attr("height", "100%");
          
         if ($("text").length < length){
            $("#warn").removeClass("hidden");
          }
          else{
            $("#warn").addClass("hidden");
            
          }
        }
      }

      return {
        init: init,
        zoomin: zoomin,
        zoomout: zoomout,
        refresh: refresh
      };

    })();


   $("#source").val(`
   A Csillagok háborúja (Star Wars) eredetileg egy űropera-filmsorozat, amely George Lucas filmrendező ötletein alapszik. A filmek cselekménye a „réges-régen, egy messzi-messzi galaxisban…” élő szereplők történetét meséli el.
   Az első filmet 1977-ben mutatták be a mozik Csillagok háborúja címmel (1981-ben Csillagok háborúja IV: Egy új remény-re változott a címe[1][2]), a film gyorsan a popkultúra megkerülhetetlen klasszikusává vált, amely számos más filmre és tudományos-fantasztikus műre volt hatással. Az első filmet két sikeres folytatás követte, az 1980-ban bemutatott A Birodalom visszavág, illetve az 1983-as A Jedi visszatér, ez a három film alkotja az eredeti Star Wars trilógiát. Az eredeti trilógiát 1999 és 2005 között egy előzmény trilógia követte, amely megosztó reakciókat váltott ki mind a rajongókból, mind a kritikusokból. 2015-ben A Jedi visszatér eseményei után játszódó újabb trilógia vette kezdetét Az ébredő Erő című epizóddal. Az első nyolc film több Oscar-díj jelölést is kapott, ám díjat csak az első két film nyert. A filmek hatalmas sikernek bizonyultak, az összes bemutatott film együttvéve 8,5 milliárd dollár bevételt termelt a mozik kasszáinál,[3] ezzel a Star Wars második legjövedelmezőbb filmsorozat a Marvel Cinematic Universe filmjei mögött.[4] Eddig két antológia film készült el, ezek a Zsivány Egyes (2016) és a Solo: Egy Star Wars-történet (2018).
   Napjainkra a filmeken kívül könyvek, televíziós sorozatok, számítógépes és videojátékok, témaparki látnivalók, vidámparkok, képregények együttesen birtokolják a Star Wars nevet, ezzel is hozzájárulva a filmek világának fejlődéséhez, bővüléséhez. A filmsorozat birtokolja a legsikeresebb filmes merchandising Guinness-rekordját. 2015-ben a Star Wars márka értékét 42 milliárd dollárra becsülték.
   A „korszellemtől”, amelyben Lucas felnőtt, ez egyáltalán nem volt idegen: a hatvanas-hetvenes évektől kezdve megfigyelhető a természettudományos optimizmus hanyatlása, sőt a tudományellenesség (ez számos okra vezethető vissza, a legnyilvánvalóbb, de közel sem biztosan az egyetlen a hidegháborús korszak légköre, amelyben az emberiség két egymástól rettegve élő frakcióra oszolva a csúcstechnológiás atomfegyverek árnyékában élte életét, amelyek egyszerre garantálták a kétes békét a kölcsönös elrettentés jegyében, illetve a totális világpusztulást, ha az előbbi véletlenül mégse működne). A Csillagok háborújával Lucas nemcsak kilúgozta a sci-fi műfajból egyik lényegét, a természettudományok iránti érdeklődést, de tovább is ment: a legelsőként elkészített filmben, amit később Új reménynek címeztek, a gonosz birodalma által elkészített bolygópusztító szuperfegyver, a Halálcsillag képviseli a tudományos-technológiai fejlődés csúcsát, amelytől még a film leggonoszabb szereplője, Darth Vader is undorodik.
   filmsorozat kezdődarabját, a Csillagok háborúját 1977. május 25-én mutatták be, majd ezt követően elkészült két folytatása, A Birodalom visszavág (1980. május 21.), majd A Jedi visszatér (1983. május 25.) is.

   Az első rész bemutatásának huszadik évfordulójára 1997-ben a IV.–VI. epizódokat újra megjelentették (először a mozikban, utána VHS kazettán), Special Editions címen. Ekkor ugyanis a technika már lehetővé tette olyan speciális effektusok alkalmazását is, amelyek a filmek forgatásának idején még nem voltak lehetségesek. A film feljavításán kívül George Lucas néhány effektust digitálisan újra feldolgozott (digitális Jabba és egy kicsiny, de fontos javítás a Han Solo és Greedo közti harcot bemutató filmrészletben). Ezenkívül 2004. szeptember 21-én ismét megjelent az eredeti trilógiának egy újabb kiadása, amelyben szintén találhatunk néhány változtatást. A legjelentősebb és legvitatottabb változtatás az volt, amikor a Csillagok háborúja VI: A jedi visszatér című rész utolsó jelenetében Lucas lecserélte az Anakin Skywalkert játszó Sebastian Shaw alakját Hayden Christensenére.
   
   1999-ben került mozikba a rajongók által várva-várt epizód a Star Wars I. rész - Baljós Árnyak, mely az eredeti trilógia cselekménye előtt körülbelül 30 évvel játszódik. Ezt követte további két folytatás, a Star Wars II. rész - A klónok támadása (2002) és a Star Wars III. rész - A Sith-ek bosszúja (2005).
   
   2011-ben megjelent a hat film bluray kiadása, amely szintén tartalmazott kisebb módosításokat, a klasszikus és az előzménytrilógiában egyaránt (utóbbiban például az I. rész Yoda-bábfiguráját számítógépes grafikára cserélték).
   
   2012-ben a Disney felvásárolta a Lucasfilmet, amely a sorozat jogaival rendelkezett, majd 2013 májusában Kathleen Kennedy, a Lucasfilm elnöke bejelentette, hogy a következő Star Wars-filmet – a sorozat hetedik részét, Az ébredő Erőt – 2014-ben kezdik forgatni J. J. Abrams irányításával (a VII. rész forgatókönyvét a rendező Lawrence Kasdan, valamint Michael Arndt írta), a filmet 2015 decemberében mutattak be a mozikban. A folytatás trilógia második részét a Rian Johnson által írt és rendezett Az utolsó Jediket 2017. decemberében mutatták be a mozik. A trilógia befejező epizódja, melyet J. J. Abrams rendez előreláthatólag 2019 decemberében kerül a mozikba.[15]
   
   A folytatás trilógiával egy időben a Lucasfilm bejelentette, hogy Az ébredő Erő bemutatása után évente olyan új filmek kerülnének a mozikba, melyek már nem a Skywalker-sorozat folytatásai lennének, hanem a Star Wars-univerzum egy-egy hősének története kerülne a filmek középpontjába.[16][17] Az első ilyen önálló film a 2016 decemberében bemutatott Zsivány Egyes volt, amely a III. és a IV. epizód között játszódik. Ezt követte 2018. májusában a Ron Howard által rendezett Solo, amely Han Solo fiatalkorát mutatja be.`)
   .trigger('change');