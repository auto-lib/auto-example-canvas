
let _ = auto({
	root: document.querySelector("#root"),
	canvas: document.createElement("canvas"),
	initial_width: 200,
	initial_height: 200,
	custom_width: 0,
	custom_height: 0,
	add: (_) => _.root.append(_.canvas),
	att: (_) => {
		_.canvas.setAttribute('width',_.initial_width+'px');
		_.canvas.setAttribute('height',_.initial_height+'px');
		_.canvas.style.backgroundColor = '#ddd';
	},
	ctx: (_) => _.canvas.getContext('2d'),
	padding: 10,
	draw: (_) => {
		console.log('draw');
		_.ctx.clearRect(0,0,_.canvas.width,_.canvas.height);
		_.ctx.strokeRect(_.padding, _.padding, _.width-_.padding*2, _.height-_.padding*2); 
	},
	width: (_) => _.custom_width > 0 ? _.custom_width : _.initial_width,
	height: (_) => _.custom_height > 0 ? _.custom_height : _.initial_height
})

_['#'].width.subscribe( width => console.log('width',width))
_['#'].height.subscribe( height => console.log('height',height))

const resizeObserver = new ResizeObserver(entries => {
  for (let entry of entries) {
    if(entry.contentRect) {
    	_.custom_width = entry.contentRect.width;
    	_.custom_height = entry.contentRect.height;
    }
}
})

setTimeout( () => {
	_.canvas.width = window.innerWidth;
	_.canvas.height = window.innerHeight;
}, 1000);


resizeObserver.observe(_.canvas);