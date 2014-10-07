// Configuration for MathJax equations

MathJax.Hub.Config({ 
	showProcessingMessages: false,
	"jax": ["input/TeX", "output/HTML-CSS"],
	"TeX": {
		equationNumbers: {
			autoNumber: "AMS" 
		} 
	},
	"HTML-CSS": {
		preferredFont: "TeX"
	},
	"tex2jax": {
		inlineMath: [['$','$'], ['\\(','\\)']],
		processEscapes: true	   
	}
});
