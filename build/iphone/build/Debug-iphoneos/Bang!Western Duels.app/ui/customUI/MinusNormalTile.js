function MinusNormalTile(){
	
	var self = Titanium.UI.createView({
		backgroundColor:'transparent',
		width:'90%',
		height:50
	});
	
	var solid = Titanium.UI.createView({
		backgroundColor:'#FDFDFD',
		width:'100%',
		height:47,
		top:0
	});
	
	var shadow = Titanium.UI.createView({
		backgroundColor:'#E2E2E2',
		width:'100%',
		height:3,
		top:47
	});
	
	var title = Titanium.UI.createLabel({
		text:'',
		font:{
     		fontSize:21,
      		fontFamily:"Roboto-Light"
   		},
   		color:'#856C64',
   		textAlign:'center'
	});
	
	self.initialize = function(tileTitle, tileTop, fontSize){
		self.top = tileTop;
		title.text = tileTitle;
		title.setFont({
			fontSize:fontSize,
      		fontFamily:"Roboto-Light"
		});
		solid.add(title);
	};
	
	self.setTitle = function(newTitle){
		title.text = newTitle;
	};
	
	self.getTitle = function(){
		return title.text;
	};
	
	self.add(solid);
	self.add(shadow);
	
	return self;
	
}

module.exports = MinusNormalTile;
