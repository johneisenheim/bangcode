function PageTitle() {

	var self = Titanium.UI.createView({
		backgroundColor : 'transparent',
		layout : 'vertical',
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE
	});
	
	var textContainer = Titanium.UI.createView({
		backgroundColor : 'transparent',
		layout : 'horizontal',
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		top:0
	});

	var leftBeauty = Titanium.UI.createLabel({
		color : '#958078',
		text : '(',
		font : {
			fontSize : 70,
			fontFamily : "ViaGrande"
		},
		left:0

	});

	var title = Titanium.UI.createLabel({
		color : '#958078',
		text : '',
		font : {
			fontSize : 90,
			fontFamily : "Go 2 Old Western"
		},
		left:0
	});

	var rightBeauty = Titanium.UI.createLabel({
		color : '#958078',
		text : ')',
		font : {
			fontSize : 70,
			fontFamily : "ViaGrande"
		},
		left:0
	});
	
	var separator = Titanium.UI.createLabel({
		text:'x',
		font:{
     		fontSize:100,
      		fontFamily:"Sughayer Separates 4"
   		},
   		color:'#856C64',
   		top:-85
	});
	
	textContainer.add(leftBeauty);
	textContainer.add(title);
	textContainer.add(rightBeauty);
	
	self.add(textContainer);
	self.add(separator);

	self.initialize = function(pageTitle, top) {
		title.text = pageTitle;
		self.top = top;
	};

	return self;

}

module.exports = PageTitle;
