describe('user signUp form', function() {
  'use strict';

  var $httpBackend;
  var ApiPath;
  var MenuService;
  var UserService;
  var SignUpController;
  var scope;
  var compileAndDigest;

  /**
   * Gets called before each unit test it()
   */
  beforeEach(function() {
    // Load module
    module('public');

    // Load any dependencies
    inject(function ($rootScope, $injector, $compile) {
      scope = $rootScope.$new();
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');

      var $controller = $injector.get('$controller');
      MenuService = $injector.get('MenuService');
      UserService = $injector.get('UserService');

      compileAndDigest = function (inputHtml, scope) {
        var inputElm = angular.element(inputHtml);
        var formElm = angular.element('<form name="signUpForm" novalidate>' +
          '<input ng-model="user.name" name="name" class="form-control" placeholder="Name" required/>' +
          '</form>');
        formElm.append(inputElm);
        $compile(formElm)(scope);
        scope.$digest();

        return inputElm;
      };

      // Instantiate controller
      SignUpController = $controller('SignUpController', {
        $scope: scope,
        MenuService: MenuService,
        UserService: UserService
      });

    });
  });

  it('ensure valid name pass validation', function() {
    compileAndDigest('<input ng-model="signUpCtrl.user.name" name="name" class="form-control" placeholder="Name" required>', scope);
    scope.signUpForm.name.$setViewValue('jose');
    scope.$digest();
    expect(scope.signUpForm.name.$valid).toEqual(true);
  });

  it('ensure invalid name are caught', function() {
    compileAndDigest('<input ng-model="signUpCtrl.user.name" name="name" class="form-control" placeholder="Name" required>', scope);
    scope.signUpForm.name.$setViewValue('');
    scope.$digest();
    expect(scope.signUpForm.name.$valid).toEqual(false);
  });

  it('ensure valid lastname pass validation', function() {
    compileAndDigest('<input ng-model="signUpCtrl.user.lastname" name="lastname" class="form-control" placeholder="Last name" required>', scope);
    scope.signUpForm.lastname.$setViewValue('Lambada');
    scope.$digest();
    expect(scope.signUpForm.lastname.$valid).toEqual(true);
  });

  it('ensure invalid lastname are caught', function() {
    compileAndDigest('<input ng-model="signUpCtrl.user.lastname" name="lastname" class="form-control" placeholder="Last name" required>', scope);
    scope.signUpForm.lastname.$setViewValue('');
    scope.$digest();
    expect(scope.signUpForm.lastname.$valid).toEqual(false);
  });

  it('ensure invalid email addresses are caught', function() {
    compileAndDigest('<input type="email" ng-model="signUpCtrl.user.email" name="email" class="form-control" placeholder="E-mail" required>', scope);
    scope.signUpForm.email.$setViewValue('asddfsdfdsfasd');
    scope.$digest();
    expect(scope.signUpForm.email.$valid).toEqual(false);
  });

  it('ensure valid email addresses pass validation', function() {
    compileAndDigest('<input type="email" ng-model="signUpCtrl.user.email" name="email" class="form-control" placeholder="E-mail" required>', scope);
    scope.signUpForm.email.$setViewValue('a@a.com');
    scope.$digest();
    expect(scope.signUpForm.email.$valid).toEqual(true);
  });

  it('ensure valid email addresses pass validation', function() {
    compileAndDigest('<input type="email" ng-model="signUpCtrl.user.email" name="email" class="form-control" placeholder="E-mail" required>', scope);
    scope.signUpForm.email.$setViewValue('a@a.com');
    scope.$digest();
    expect(scope.signUpForm.email.$valid).toEqual(true);
  });

  it('ensure invalid phone number are caught', function() {
    compileAndDigest('<input type="number" ng-model="signUpCtrl.user.phone" name="phone" class="form-control" placeholder="Phone ##########" required>', scope);
    scope.signUpForm.phone.$setViewValue('a@a.com');
    scope.$digest();
    expect(scope.signUpForm.phone.$valid).toEqual(false);
  });

  it('ensure valid phone number pass validation', function() {
    compileAndDigest('<input type="number" ng-model="signUpCtrl.user.phone" name="phone" class="form-control" placeholder="Phone ##########" required>', scope);
    scope.signUpForm.phone.$setViewValue('2132132222');
    scope.$digest();
    expect(scope.signUpForm.phone.$valid).toEqual(true);
  });

  it('ensure valid favouriteDish pass validation', function() {
    $httpBackend.expectGET(ApiPath + '/menu_items/.json').respond([]);
    compileAndDigest('<input ng-model="signUpCtrl.user.favouriteDish" name="favouriteDish" class="form-control" placeholder="Favourite Dish" ng-trim="true" ng-model-options="{ updateOn: \'default blur\'}" check-availability>', scope);
    $httpBackend.expectGET(ApiPath + '/menu_items/L1.json').respond([]);
    scope.signUpForm.favouriteDish.$setViewValue('L1');
    scope.$digest();
    $httpBackend.flush();
    expect(scope.signUpForm.favouriteDish.$valid).toBe(true);
    expect(scope.signUpForm.favouriteDish.$invalid).toBe(false);
  });

  it('ensure invalid favouriteDish are caught', function() {
    $httpBackend.expectGET(ApiPath + '/menu_items/.json').respond([]);
    compileAndDigest('<input ng-model="signUpCtrl.user.favouriteDish" name="favouriteDish" class="form-control" placeholder="Favourite Dish" ng-trim="true" ng-model-options="{ updateOn: \'default blur\'}" check-availability>', scope);
    $httpBackend.expectGET(ApiPath + '/menu_items/L1333.json').respond(500);
    scope.signUpForm.favouriteDish.$setViewValue('L1333');
    scope.$digest();
    $httpBackend.flush();
    expect(scope.signUpForm.favouriteDish.$invalid).toBe(true);
  });

});