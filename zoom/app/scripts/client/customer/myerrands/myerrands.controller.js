'use strict';

/**
 * @ngdoc function
 * @name zoomApp.controller:MyErrandsController
 * @description
 * # MyErrandsController
 * MyErrandsController of the zoomApp
 */
zoomApp.controller('MyErrandsController', MyErrandsController);
MyErrandsController.$inject = ['$rootScope', '$scope', '$state', '$http', 'moment', 'API_URL', 'toastr'];

function MyErrandsController($rootScope, $scope, $state, $http, moment, API_URL, toastr) {
	
	var vm                   = this;
	vm.orderAgain            = orderAgain;
	vm.editErrandRow         = editErrandRow;
	vm.editErrandType        = editErrandType;
	vm.editErrandDetails 		 = editErrandDetails;
	vm.saveOrder             = saveOrder;

	vm.editing_errand_status = {}
	vm.errand_status_title = { open: 'Active', close: 'Completed', cancel: 'Cancelled'};
	vm.busy = true;
	
  $http.get(API_URL + '/all_types')
  .then(function(resp) {
    vm.all_types = resp.data; 
  });

  $http.get(API_URL + '/client/tasks/summary')
  .then(function(resp) {
    vm.errands_counts = resp.data; 
  });

  vm.getErrands = function(status, title) {
  	vm.errands_status = status;
		vm.errands_title = vm.errand_status_title[status] || 'All';	
		vm.busy = true;
		vm.offset = 0;
		vm.limit = 10;

    $http.get(API_URL + '/client/tasks/summary')
	  .then(function(resp) {
	    vm.errands_counts = resp.data; 
	  });
	
  	$http.get(API_URL + '/client/tasks/mytasks', {params: { status: vm.errands_status, limit: vm.limit }})
	  .then(function(resp) {   
	    vm.errands = resp.data.tasks;
	    vm.busy = !resp.data.moredata;
	  }, function(resp) {
	  	vm.busy = true;
	  });
  }

  vm.loadMoreErrands = function() {
  	vm.busy = true;
  	vm.offset += vm.limit;
  	$http.get(API_URL + '/client/tasks/mytasks', {params: { status: vm.errands_status, limit: vm.limit, offset: vm.offset }})
	  .then(function(resp) {   
	    vm.errands = vm.errands.concat(resp.data.tasks);
	    vm.busy = !resp.data.moredata;
	  }, function(resp) {
	  	vm.busy = true;
	  });
  }

  vm.getErrands('open', 'Active');

	function orderAgain(errand) {
		$rootScope.errand = errand;
    $rootScope.errand.task_uploads = {};
		$state.go('app.home.postnewerrand');
	}

	function editErrandRow(index, errand) {
		vm.editing_errand = angular.copy(errand);
		vm.editing_errand_status.index = index;
		vm.editing_errand_status.type = index;
		vm.editing_errand_status.details = index;
	}

	function editErrandType(index, errand) {
		vm.editing_errand_status.index = index;
		vm.editing_errand_status.type = index;
		if (vm.editing_errand_status.details != index) {
			vm.editing_errand = angular.copy(errand);
			vm.editing_errand_status.details = null;
		}
	}

	function editErrandDetails(index, errand) {
		vm.editing_errand_status.index = index;
		vm.editing_errand_status.details = index;
		if (vm.editing_errand_status.type != index) {
			vm.editing_errand = angular.copy(errand);
			vm.editing_errand_status.type = null;
		}		
	}

	function saveOrder(index, errand) {
		$http.put(API_URL + '/client/tasks/' + errand.id, {task: vm.editing_errand})
	  .then(function(data) {
	  	angular.extend(errand, data.data);
	  }, function(data) {
	    if (data.data && data.data.alert) {
	      toastr.warning(data.data.alert);
	    } else {
	      toastr.warning("error");
	    }
	  });  
		vm.editing_errand_status.index = null;
		vm.editing_errand_status.type = null;
		vm.editing_errand_status.details = null;
	}
};
