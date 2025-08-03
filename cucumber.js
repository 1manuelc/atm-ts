module.exports = {
	default: {
		require: ['tests/features/steps/*.ts', 'tests/utils/hooks.ts'],
		paths: ['tests/features/*.feature'],
		requireModule: ['ts-node/register'],
		format: ['progress', 'html:reports/report.html'],
	},
};
