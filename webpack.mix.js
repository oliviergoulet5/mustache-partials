/*!
 * Copyright (c) 2018 Eclipse Foundation, Inc.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * Contributors:
 *   Christopher Guindon <chris.guindon@eclipse-foundation.org>
 *
 * SPDX-License-Identifier: EPL-2.0
 */

// Configure
require('./webpack-solstice-assets.mix');
let mix = require('laravel-mix');
mix.EclipseFdnSolsticeAssets();
mix.sourceMaps();

mix.js(['index.js'], 'dist/bundle.js');
