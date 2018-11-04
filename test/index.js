/* eslint-disable node/no-unpublished-require */
'use strict';

const {join} = require('path');

const test = require('tape');
const {extensions, workspace, window} = require('vscode');

const run = () => test('vscode-stylelint-stzhang', async t => {
	const vscodeStylelint = extensions.getExtension('shinnn.stylelint');

	const plaintextDocument = await workspace.openTextDocument({
		content: 'Hello',
		language: 'plaintext'
	});

	await window.showTextDocument(plaintextDocument);

	t.equal(
		vscodeStylelint.isActive,
		false,
		'should not be activated when the open file is not CSS.'
	);

	const cssDocument = await workspace.openTextDocument({
		content: '}',
		language: 'css'
	});

	await window.showTextDocument(cssDocument);

	t.equal(
		vscodeStylelint.isActive,
		true,
		'should be activated when the open file is CSS.'
	);

	t.equal(
		(await workspace.openTextDocument(join(__dirname, '.stylelintignore'))).languageId,
		'ignore',
		'should add syntax highlighting to .stylelintignore.'
	);

	t.end();
});

exports.run = (root, done) => {
	test.onFinish(done);
	run();
};
