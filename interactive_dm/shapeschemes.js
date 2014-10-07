// Mass interpolation schemes 

// container and SVG size
var w = $("#shapeschemes").parent().width();
var h = w;

// global attributes
var handle_pos;
var grid_coords;
var res = 11;
var dq = 1.0/res;
var grid;
var handles;

// mass interpolation schemes
var schemes = [
	{
		name: "Linear Quadrilateral",
		init: function() {

			// initial positions of the 9 points
			handle_pos = [
				{ x: 0.25*w, y: 0.25*h },
				{ x: 0.75*w, y: 0.25*h },
				{ x: 0.75*w, y: 0.75*h },
				{ x: 0.25*w, y: 0.75*h }
			];

			// Lagrangian coordinates of the curvilinear grid
			grid_coords = [];
			for(i = 0; i <= res; ++i) {
				grid_coords.push({
					l0: { a: dq*i, b: 0.0 },
					l1: { a: dq*i, b: 1.0 }
				});
				grid_coords.push({
					l0: { a: 0.0, b: dq*i },
					l1: { a: 1.0, b: dq*i }
				});
			}
		},
		colors: function(_) {
			return "red";
		},
		path: function(d) {

			function transform(q) {
				// shape functions
				var sf = [(1 - q.a)*(1 - q.b), q.a*(1 - q.b),
							q.a*q.b, (1 - q.a)*q.b];
				
				var retpos = { x: 0.0, y: 0.0 };
				for(i = 0; i < 4; ++i) {
					retpos.x += handle_pos[i].x*sf[i];
					retpos.y += handle_pos[i].y*sf[i];
				}
				return retpos;
			}

			var p0 = transform(d.l0);
			var p1 = transform(d.l1);
			return "M" + p0.x + "," + p0.y + " L" + p1.x + "," + p1.y;
		}
	},
	{
		name: "Linear Triangles",
		init: function() {

			// initial positions of the 9 points
			handle_pos = [
				{ x: 0.25*w, y: 0.25*h },
				{ x: 0.75*w, y: 0.25*h },
				{ x: 0.75*w, y: 0.75*h },
				{ x: 0.25*w, y: 0.75*h }
			];

			// Lagrangian coordinates of the curvilinear grid
			grid_coords = [];
			// triangle 0
			for(i = 0; i < res; ++i) {
				grid_coords.push({
					l0: { a: dq*i, b: 0.0, t: 0 },
					l1: { a: dq*i, b: 1.0 - dq*i, t: 0 }
				});
				grid_coords.push({
					l0: { b: dq*i, a: 0.0, t: 0 },
					l1: { b: dq*i, a: 1.0 - dq*i, t: 0 }
				});
			}
			// divider
			grid_coords.push({
				l0: { a: 1.0, b: 0.0, t: 0 },
				l1: { a: 0.0, b: 1.0, t: 0 }
			});
			// triangle 1
			for(i = 1; i <= res; ++i) {
				grid_coords.push({
					l0: { a: 1.0 - dq*i, b: 0.0, t: 1 },
					l1: { a: 1.0 - dq*i, b: dq*i, t: 1 }
				});
				grid_coords.push({
					l0: { b: 1.0 - dq*i, a: 0.0, t: 1 },
					l1: { b: 1.0 - dq*i, a: dq*i, t: 1 }
				});
			}
		},
		colors: function(_) {
			return "red";
		},
		path: function(d) {
		
			function transform(q) {
				// barycentric shape function
				var sf = [q.a, q.b, q.c];

				// map 6 triangle verts to the 9 handle verts
				var vertmap = [
						[3, 1, 0],	
						[1, 3, 2]
					];
				
				var retpos = { x: 0.0, y: 0.0 };
				for(i = 0; i < 3; ++i) {
					retpos.x += handle_pos[vertmap[q.t][i]].x*sf[i];
					retpos.y += handle_pos[vertmap[q.t][i]].y*sf[i];
				}
			
				return retpos;
			};

			var b0 = { a: d.l0.a, b: d.l0.b, c: 1.0 - d.l0.a - d.l0.b, t: d.l0.t };
			var b1 = { a: d.l1.a, b: d.l1.b, c: 1.0 - d.l1.a - d.l1.b, t: d.l0.t };

			var p0 = transform(b0);
			var p1 = transform(b1);
			return "M" + p0.x + "," + p0.y + " L" + p1.x + "," + p1.y;
		}
	},
	{
		name: "Quadratic Quadrilateral",
		init: function() {

			// initial positions of the 9 points
			handle_pos = [
				{ x: 0.25*w, y: 0.25*h },
				{ x: 0.75*w, y: 0.25*h },
				{ x: 0.75*w, y: 0.75*h },
				{ x: 0.25*w, y: 0.75*h },
				{ x: 0.5*w, y: 0.25*h },
				{ x: 0.75*w, y: 0.5*h },
				{ x: 0.5*w, y: 0.75*h },
				{ x: 0.25*w, y: 0.5*h },
				{ x: 0.5*w, y: 0.5*h }
			];

			// Lagrangian coordinates of the curvilinear grid
			grid_coords = [];
			for(i = 0; i <= res; ++i) {
				grid_coords.push({
					l0: { a: dq*i, b: 0.0 },
					l1: { a: dq*i, b: 1.0 }
				});
				grid_coords.push({
					l0: { a: 0.0, b: dq*i },
					l1: { a: 1.0, b: dq*i }
				});
			}
		},
		colors: function(d, i) {
			if(i < 4) return "red";
			if(i < 8) return "green";
			return "blue";
		},
		path: function(d) {
			function transform(q) {
				// shape functions
				var sf = [
						(2*q.a - 1)*(q.a - 1)*(2*q.b - 1)*(q.b - 1),
						(1 - 2*q.a)*(-q.a)*(2*q.b - 1)*(q.b - 1),
						(1 - 2*q.a)*(-q.a)*(1 - 2*q.b)*(-q.b),
						(2*q.a - 1)*(q.a - 1)*(1 - 2*q.b)*(-q.b),
						-4*(q.a)*(q.a - 1)*(2*q.b - 1)*(q.b - 1),
						-4*(1 - 2*q.a)*(-q.a)*(q.b)*(q.b - 1),
						-4*(q.a)*(q.a - 1)*(1 - 2*q.b)*(-q.b),
						-4*(2*q.a - 1)*(q.a - 1)*(q.b)*(q.b - 1),
						16*q.a*(q.a - 1)*q.b*(q.b - 1)
					];
				
				var retpos = { x: 0.0, y: 0.0 };
				for(i = 0; i < 9; ++i) {
					retpos.x += handle_pos[i].x*sf[i];
					retpos.y += handle_pos[i].y*sf[i];
				}
			
				return retpos;
			}

			var lc = {
				a: 0.5*(d.l0.a + d.l1.a),
				b: 0.5*(d.l0.b + d.l1.b)
			};

			var p0 = transform(d.l0);
			var pc = transform(lc);
			var p1 = transform(d.l1);
			return "M" + p0.x + "," + p0.y + " Q" + (2*pc.x - 0.5*(p0.x + p1.x)) 
				+ "," + (2*pc.y - 0.5*(p0.y + p1.y)) + " " + p1.x + "," + p1.y;
		}
	},
	{
		name: "Quadratic Triangles",
		init: function() {

			// initial positions of the 9 points
			handle_pos = [
				{ x: 0.25*w, y: 0.25*h },
				{ x: 0.75*w, y: 0.25*h },
				{ x: 0.75*w, y: 0.75*h },
				{ x: 0.25*w, y: 0.75*h },
				{ x: 0.5*w, y: 0.25*h },
				{ x: 0.75*w, y: 0.5*h },
				{ x: 0.5*w, y: 0.75*h },
				{ x: 0.25*w, y: 0.5*h },
				{ x: 0.5*w, y: 0.5*h }
			];

			// Lagrangian coordinates of the curvilinear grid
			grid_coords = [];
			// triangle 0
			for(i = 0; i < res; ++i) {
				grid_coords.push({
					l0: { a: dq*i, b: 0.0, t: 0 },
					l1: { a: dq*i, b: 1.0 - dq*i, t: 0 }
				});
				grid_coords.push({
					l0: { b: dq*i, a: 0.0, t: 0 },
					l1: { b: dq*i, a: 1.0 - dq*i, t: 0 }
				});
			}
			// divider
			grid_coords.push({
				l0: { a: 1.0, b: 0.0, t: 0 },
				l1: { a: 0.0, b: 1.0, t: 0 }
			});
			// triangle 1
			for(i = 1; i <= res; ++i) {
				grid_coords.push({
					l0: { a: 1.0 - dq*i, b: 0.0, t: 1 },
					l1: { a: 1.0 - dq*i, b: dq*i, t: 1 }
				});
				grid_coords.push({
					l0: { b: 1.0 - dq*i, a: 0.0, t: 1 },
					l1: { b: 1.0 - dq*i, a: dq*i, t: 1 }
				});
			}
		},
		colors: function(d, i) {
			if(i < 4) return "red";
			return "green";
		},
		path: function(d) {
		
			function transform(q) {
				// barycentric shape function
				var sf = [
					q.a*(2.0*q.a - 1.0),
				    q.b*(2.0*q.b - 1.0),
				  	q.c*(2.0*q.c - 1.0),
				    4.0*q.a*q.b,
					4.0*q.b*q.c,
					4.0*q.c*q.a
				];

				// map 6 triangle verts to the 9 handle verts
				var vertmap = [
						[3, 1, 0, 8, 4, 7],	
						[1, 3, 2, 8, 6, 5]
					];
				
				var retpos = { x: 0.0, y: 0.0 };
				for(i = 0; i < 6; ++i) {
					retpos.x += handle_pos[vertmap[q.t][i]].x*sf[i];
					retpos.y += handle_pos[vertmap[q.t][i]].y*sf[i];
				}
			
				return retpos;
			};

			var b0 = { a: d.l0.a, b: d.l0.b, c: 1.0 - d.l0.a - d.l0.b, t: d.l0.t };
			var b1 = { a: d.l1.a, b: d.l1.b, c: 1.0 - d.l1.a - d.l1.b, t: d.l0.t };
			var bc = {
				a: 0.5*(b0.a + b1.a),
				b: 0.5*(b0.b + b1.b),
				c: 0.5*(b0.c + b1.c),
				t: b0.t
			};

			var p0 = transform(b0);
			var pc = transform(bc);
			var p1 = transform(b1);
			return "M" + p0.x + "," + p0.y + " Q" + (2*pc.x - 0.5*(p0.x + p1.x)) 
				+ "," + (2*pc.y - 0.5*(p0.y + p1.y)) + " " + p1.x + "," + p1.y;
		}
	}

];

// Create SVG elements
var container = d3.select("#shapeschemes")
	.style("width", w + "px")
	.style("height", h + "px");
var svg = container.append("svg");

// Create menu
var menu = container.append("select");
menu.selectAll("option")
	.data(schemes)
	.enter()
	.append("option")
	.text(function(d) {
		return d.name;
	});
menu.on("change", function(_) {
	init(this.selectedIndex);
});

function init(si) {

	schemes[si].init();

	svg.selectAll(".grid").remove();
	grid = svg.selectAll(".grid")
		.data(grid_coords)
		.enter()
		.append("path")
		.attr("class", "grid")
		.attr("d", schemes[si].path);

	svg.selectAll(".handle").remove();
	handles = svg.selectAll(".handle")
		.data(handle_pos)
		.enter()
		.append("circle")
		.attr("class", "handle")
		.attr("cx", function(d) {
			return d.x;
		})
		.attr("cy", function(d) {
			return d.y;
		})
		.attr("r", 8)
		.style("stroke", schemes[si].colors);

	handles.call(d3.behavior.drag()
		.on("drag", function(d, i) {
	
			// clamp coordinates to the svg canvas range
			var x_new = d3.event.x;
			if(x_new < 0) x_new = 0;
			else if(x_new >= w) x_new = w - 1;
			var y_new = d3.event.y;
			if(y_new < 0) y_new = 0;
			else if(y_new >= h) y_new = h - 1;
	
			// update data
			d3.select(this)
				.attr("cx", x_new)
				.attr("cy", y_new)
				.datum({ x: x_new, y: y_new	});
			handle_pos[i].x = x_new;
			handle_pos[i].y = y_new;
	
			// update curve descriptions
			grid.attr("d", schemes[si].path);
		}));
}

// Initialize the demo with the first scheme option
init(0);

