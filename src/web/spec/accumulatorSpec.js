describe('accumulator', function () {

	beforeEach(angular.mock.module('accumulatorApp'));

	var $controller, $httpBackend;

	beforeEach(angular.mock.inject(function (_$controller_, _$httpBackend_) {
		$controller = _$controller_;
		$httpBackend = _$httpBackend_;
	}));

	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	describe('Messages', function () {
		it('add increases length by one', function () {
			var $scope = {};
			var controller = $controller('AccumulatorController', { $scope: $scope });
			$httpBackend.expectPOST('/api').respond(201, '{}');

			$scope.item = "newItem";
			$scope.add();
			$httpBackend.flush();

			expect($scope.accumulator.length).toBe(1);
		});
	});

});