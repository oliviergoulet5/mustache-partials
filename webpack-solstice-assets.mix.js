/*!
 * Copyright (c) 2021, 2023 Eclipse Foundation, Inc.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * Contributors:
 *   Christopher Guindon <chris.guindon@eclipse-foundation.org>
 *   Olivier Goulet <olivier.goulet@eclipse-foundation.org>
 *
 * SPDX-License-Identifier: EPL-2.0
 */


let mix = require('laravel-mix');
require('laravel-mix-transpile-node-modules');
mix.transpileNodeModules(['eclipsefdn-solstice-assets']);

class EclipseFdnSolsticeAssets {

  register() {
      console.log('Loading eclipsefdn-solstice-assets default configurations.');
  }

  webpackConfig(config) {
    // We need to prevent babel-loader from running on typescript files. To do
    // so, we need to find all the rules that run on typescript files and
    // find the one that uses babel-loader. Once we found the rule with
    // babel-loader, we need to change the test to not match typescript files.
    const typescriptRules = config.module.rules.filter(rule => rule.test.toString().includes('tsx?'));
    const babelLoaderRule = typescriptRules.find(rule => 
      rule.use.find(loader => loader.loader.includes('babel-loader'))
    );
    babelLoaderRule.test = /\.(mjs|js|jsx)$/;

    // Once we are sure that babel-loader won't run on typescript files, we can
    // add a new rule to run ts-loader on typescript files.
    config.module.rules.unshift({
      test: /\.tsx?$/,
      loader: 'ts-loader',
    });
    config.module.rules.unshift( {
      test: /^(?!.*\.partial\.mustache$).*\.mustache$/,
      loader: 'mustache-loader',
    });
    config.module.rules.unshift({
      test: /\.partial\.mustache$/,
      loader: 'raw-loader',

    });

    config.resolve.extensions.push('.ts', '.tsx');
    // support for corejs fallbacks
    config.resolve.fallback = config.resolve.fallback || {};
    config.resolve.fallback['querystring'] = require.resolve('querystring-es3');
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias['jquery'] = 'jquery/src/jquery';
  }
}

mix.extend('EclipseFdnSolsticeAssets', new EclipseFdnSolsticeAssets());
