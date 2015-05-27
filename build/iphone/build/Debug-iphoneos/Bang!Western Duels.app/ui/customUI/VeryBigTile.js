function VeryBigTile(){
	
	var self = Titanium.UI.createView({
		backgroundColor:'transparent',
		width:'90%',
		height:120
	});
	
	var solid = Titanium.UI.createView({
		backgroundColor:'#FDFDFD',
		width:'100%',
		height:117,
		top:0
	});
	
	var shadow = Titanium.UI.createView({
		backgroundColor:'#E2E2E2',
		width:'100%',
		height:3,
		top:117
	});
	
	var title = Titanium.UI.createLabel({
		text:'',
		font : {
			fontSize : 18,
			fontFamily : "Roboto-LightItalic"
		},
   		color:'#856C64',
   		textAlign:'center'
	});
	
	self.initialize = function(tileTitle, tileTop, fontSize){
		self.top = tileTop;
		title.text = tileTitle;
		solid.add(title);
	};
	
	self.setTitle = function(newTitle){
		title.text = newTitle;
	};
	
	self.add(solid);
	self.add(shadow);
	
	return self;
	
}

module.exports = VeryBigTile;
