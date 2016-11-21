function d3_graph() {

// Some reference links:
// How to get link ids instead of index
// http://stackoverflow.com/questions/23986466/d3-force-layout-linking-nodes-by-name-instead-of-index
// embedding web2py in d3
// http://stackoverflow.com/questions/34326343/embedding-d3-js-graph-in-a-web2py-bootstrap-page

// nodes and links are defined in appadmin.html <script>


    var edges = [];

    links.forEach(function(e) {
        var sourceNode = nodes.filter(function(n) {
            return n.name === e.source;
        })[0],
            targetNode = nodes.filter(function(n) {
            return n.name === e.target;
        })[0];

        edges.push({
            source: sourceNode,
            target: targetNode,
            value: 1});

    });

    edges.forEach(function(e) {

        if (!e.source["linkcount"]) e.source["linkcount"] = 0;
        if (!e.target["linkcount"]) e.target["linkcount"] = 0;

        e.source["linkcount"]++;
        e.target["linkcount"]++;
    });

    var width = 960, height = 600;
    var svg = d3.select("#vis").append("svg")
            .attr("width", width)
            .attr("height", height);

    // updated for d3 v4.
    var simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function(d) { return d.id; }))
            .force("charge", d3.forceManyBody().strength(strength))
            .force("center", d3.forceCenter(width / 2, height / 2));

    // Node charge strength.  Stronger for less links.
    function strength(d) { return -100/d["linkcount"] ; }
    // Link distance.  Distance increases with number of links at source and target
    function distance(d) { return (d.source["linkcount"] + d.target["linkcount"]) * 1 ; }
    // Link strength.  Strength is less for highly connected nodes (moves them apart)
    function strengthl(d) { return 0.03/(d.source["linkcount"] + d.target["linkcount"]) ; }

    simulation
        .nodes(nodes)
        .on("tick", tick);
    
    simulation.force("link")
        .links(edges)
        .distance(distance)
        .strength(strengthl);

    // build the arrow.
    svg.append("svg:defs").selectAll("marker")
        .data(["end"])      // Different link/path types can be defined here
        .enter().append("svg:marker")    // This section adds in the arrows
        .attr("id", String)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 25)   // Moves the arrow head out, allow for radius 
        .attr("refY", 0)   // -1.5
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5");

    var link = svg.selectAll('.link')
        .data(edges)
        .enter().append('line')
        .attr("class", "link")
        .attr("marker-end", "url(#end)");

    var node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", function(d) { return "node " + d.type;})
        .attr("x", function(d) {return d.name.startsWith("auth") ? 0 : 960;})
        .classed("auth", function(d) { return (d.name.startsWith("auth") ? true : false);})
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    // add the nodes
    node.append('circle')
        .attr('r', 20)
        ;

    // add text
    node.append("text")
        .attr("x", 14)
        .attr("dy", "-1.2em")
        .text(function(d) {return d.name;});

    node.on("mouseover", function(d) {

        var g = d3.select(this);  // the node (table)

        // tooltip
  
        var fields = d.fields;
        var fieldformat = "<TABLE>"
        fields.forEach(function(d) {
            fieldformat += "<TR><TD><B>"+ d.name+"</B></TD><TD>"+ d.type+"</TD><TD>"+ d.disp+"</TD></TR>";
        });
        fieldformat += "</TABLE>"

        // Define 'div' for tooltips
        var div = d3.select("body").append("div")  // declare the tooltip div
	        .attr("class", "tooltip")              // apply the 'tooltip' class
            .style("opacity", 0)
            .html('<h5>' + d.name + '</h5>' + fieldformat)
            .style("left", 10 + (d3.event.pageX) + "px")// or just (d.x + 50 + "px")
            .style("top", (d3.event.pageY - 20) + "px")// or ...
            .transition()
            .duration(800)
            .style("opacity", 0.9);
        });

        node.on("mouseout", function(d) {
            d3.select("body").select('div.tooltip').remove();
    });

    // instead of waiting for force to end with :     force.on('end', function()
    // use .on("tick",  instead.  Here is the tick function
    function tick() {
        node.attr('transform', function(d) {
            return "translate(" + d.x + "," + d.y + ")"; });

        link.attr('x1', function(d) {return d.source.x;})
            .attr('y1', function(d) {return d.source.y;})
            .attr('x2', function(d) {return d.target.x;})
            .attr('y2', function(d) {return d.target.y;});
    };

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    };

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    };

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    };

};