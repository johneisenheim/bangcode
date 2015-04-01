function ChallengeView() {

	var CustomButton = require('ui/customUI/CustomButton');
	var startChallengeButton = new CustomButton();
	var PageTitle = require('ui/customUI/PageTitle');
	var pageTitle = new PageTitle();
	pageTitle.initialize('Sfide', 0);

	var self = Titanium.UI.createScrollView({
		backgroundColor : '#F5F4F2',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		layout : 'vertical',
		top:65
	});

	var receivedChallengesLabel = Titanium.UI.createLabel({
		top : 15,
		font : {
			fontSize : 21,
			fontFamily : "Roboto-Light"
		},
		text : String.format(L('challenge:receivedChallengesLabel'), ''),
		textAlign : 'center',
		color : '#856C64',
		width : '95%'
	});
	
	var sentChallengesLabel = Titanium.UI.createLabel({
		top : 25,
		font : {
			fontSize : 21,
			fontFamily : "Roboto-Light"
		},
		text : String.format(L('challenge:sentChallengesLabel'), ''),
		textAlign : 'center',
		color : '#856C64',
		width : '95%'
	});

	var table = Titanium.UI.createTableView({
		data : [{
			title : "Sfida 1",
			height : 45,
			hasDetail : true,
			color : '#856C64',
			font : {
				fontSize : 19,
				fontFamily : "Roboto-Light"
			}
			//url : "<Specify the whole path of your detail.js file>"
		}, {
			title : "Sfida 2",
			height : 45,
			hasDetail : true,
			color : '#856C64',
			font : {
				fontSize : 19,
				fontFamily : "Roboto-Light"
			}
			//url : "<Specify the whole path of your detail.js file>"
		}, {
			title : "Sfida 3",
			hasDetail : true,
			height : 45,
			color : '#856C64',
			font : {
				fontSize : 19,
				fontFamily : "Roboto-Light"
			}
			//url : "<Specify the whole path of your detail.js file>"
		}, {
			title : "Sfida 4",
			hasDetail : true,
			height : 45,
			color : '#856C64',
			font : {
				fontSize : 19,
				fontFamily : "Roboto-Light"
			}
			//url : "<Specify the whole path of your detail.js file>"
		}, {
			title : "Sfida 5",
			hasDetail : true,
			height : 45,
			color : '#856C64',
			font : {
				fontSize : 19,
				fontFamily : "Roboto-Light"
			}
			//url : "<Specify the whole path of your detail.js file>"
		}],
		top : 15,
		width : '100%',
		height : 225,
		showVerticalScrollIndicator : true,
		separatorColor:'#B8B1AF',
		backgroundColor:'#FDFDFD'
	});
	
	var table2 = Titanium.UI.createTableView({
		data : [{
			title : "Sfida 1",
			height : 45,
			hasDetail : true,
			color : '#856C64',
			font : {
				fontSize : 19,
				fontFamily : "Roboto-Light"
			}
			//url : "<Specify the whole path of your detail.js file>"
		}, {
			title : "Sfida 2",
			height : 45,
			hasDetail : true,
			color : '#856C64',
			font : {
				fontSize : 19,
				fontFamily : "Roboto-Light"
			}
			//url : "<Specify the whole path of your detail.js file>"
		}, {
			title : "Sfida 3",
			hasDetail : true,
			height : 45,
			color : '#856C64',
			font : {
				fontSize : 19,
				fontFamily : "Roboto-Light"
			}
			//url : "<Specify the whole path of your detail.js file>"
		}, {
			title : "Sfida 4",
			hasDetail : true,
			height : 45,
			color : '#856C64',
			font : {
				fontSize : 19,
				fontFamily : "Roboto-Light"
			}
			//url : "<Specify the whole path of your detail.js file>"
		}, {
			title : "Sfida 5",
			hasDetail : true,
			height : 45,
			color : '#856C64',
			font : {
				fontSize : 19,
				fontFamily : "Roboto-Light"
			}
			//url : "<Specify the whole path of your detail.js file>"
		}],
		top : 15,
		width : '100%',
		height : 225,
		showVerticalScrollIndicator : true,
		separatorColor:'#B8B1AF',
		backgroundColor:'#FDFDFD'
	});
	
	table.addEventListener('click', function(){
		Ti.App.fireEvent('change_page',{});
	});

	//startChallengeButton.initialize('Lancia sfida', 40);

	self.add(pageTitle);
	self.add(receivedChallengesLabel);
	self.add(table);
	self.add(sentChallengesLabel);
	self.add(table2);
	//self.add(startChallengeButton);

	return self;
}

module.exports = ChallengeView;
