'use strict';

/**
 * @ngdoc function
 * @name zoomApp.controller:MyErrandsController
 * @description
 * # MyErrandsController
 * MyErrandsController of the zoomApp
 */
zoomApp.controller('MyErrandsController', MyErrandsController);
MyErrandsController.$inject = ['$scope', 'moment', '$sce'];

function MyErrandsController($scope, moment, $sce) {
	
	var vm = $scope;
	vm.orderAgain = orderAgain;
	vm.editOrder = editOrder;
	vm.saveOrder = saveOrder;
	vm.getPopoverTemplate = $sce.trustAsHtml('<div class="contentPopoverZoom"><p>Take doc to lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, natus.</p><button class="btn btn-sm">EDIT</button><div class="clearfix"></div></div>');

	init();

	function init() {
		vm.editErrand = { index: -1 };
	}

	vm.errandTypes =  ['Courier service', 'Delivery', 'Grocery shopping', 'House sitting', 'Dog walking', 'Garage sale', 'Pet sitting'];

	vm.errands = [
		{ date: '2016-05-01',
		  image: 'images/photo1.png',
		  type: 'Courier Service',
		  description: 'Take doc to lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, natus.',
		  hoursUsed: 3,
		  fundsUsed: 'None' 
		},
		{ date: '2016-05-02',
		  image: 'images/photo2.png',
		  type: 'Courier Service',
		  description: 'Take doc to lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, natus.',
		  hoursUsed: 3,
		  fundsUsed: 'None' 
		},
		{ date: '2016-05-03',
		  image: 'images/photo3.png',
		  type: 'Courier Service',
		  description: 'Take doc to lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, natus.',
		  hoursUsed: 3,
		  fundsUsed: 'None' 
		},
		{ date: '2016-05-04',
		  image: 'images/photo4.png',
		  type: 'Courier Service',
		  description: 'Take doc to lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, natus.',
		  hoursUsed: 3,
		  fundsUsed: 'None' 
		},
		{ date: '2016-05-05',
		  image: 'images/photo5.png',
		  type: 'Courier Service',
		  description: 'Take doc to lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, natus.',
		  hoursUsed: 3,
		  fundsUsed: 'None' 
		},
		{ date: '2016-05-06',
		  image: 'images/photo6.png',
		  type: 'Courier Service',
		  description: 'Take doc to lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, natus.',
		  hoursUsed: 3,
		  fundsUsed: 'None' 
		}
	];

	function orderAgain(errand) {
		console.log(errand);
	}

	function editOrder(index, errand) {
		vm.editErrand.index = index;
	}

	function saveOrder(index, errand) {
		vm.editErrand.index = -1;
	}

	function getPopoverTemplate(string) {
		// var html = $sce.trustAsHtml('<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>');
		// console.log(html);
		// return html;
	}

	/*
	$('.tooltipErrandService, .tooltipDescription').each(function(){
        $(this).tooltip({
            html: true,
            title: $('#contentTooltip').html(),
            placement:'bottom',
            trigger:'focus',
            // trigger:'click',
            template:'<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>'
        });
    });
    */
};
