var expect = chai.expect;

describe('hello world', function () {
	it('should be true', function () {
		expect(true).to.equal(true);
	});
});

describe('#add', function () {
	it('should add 2 + 2', function () {
		var result = add(2, 2);
		expect(result).to.equal(4);
	});

});

function library(input, cb) {
	$.ajax('/some/url', {
		data: JSON.stringify(input),
		success: function (result) {
			cb(null, result);
		},
		error: function () {
			cb('it did bad things');
		}
	});
}

describe('$.ajax', function () {
	var realAjax;
	beforeEach(function () {
		realAjax = $.ajax;
		$.ajax = function (input, args) {
			args.success(5);
		};
	});
	afterEach(function () {
		$.ajax = realAjax;
	});

	it('should call library successfully', function (done) {

		var input = {some:'params'};
		var expected = 5;

		library(input, function (err, result) {

			expect(result).to.equal(expected);
			done();

		});

	});

});

