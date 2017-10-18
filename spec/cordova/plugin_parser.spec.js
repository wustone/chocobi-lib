/**
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
*/
/* eslint-env jasmine */
var path = require('path');
var fs = require('fs');
var Plugin_parser = require('../../src/cordova/plugin_parser');
var xml = path.join(__dirname, 'fixtures', 'plugins', 'test', 'plugin.xml');

var xml_contents = fs.readFileSync(xml, 'utf-8');

describe('plugin.xml parser', function () {
    beforeEach(function () {
        spyOn(fs, 'readFileSync').and.returnValue(xml_contents);
    });

    it('Test 001 : should read a proper plugin.xml file', function () {
        var cfg;
        expect(function () {
            cfg = new Plugin_parser(xml);
        }).not.toThrow();
        expect(cfg).toBeDefined();
        expect(cfg.doc).toBeDefined();
    });
    it('Test 002 : should be able to figure out which platforms the plugin supports', function () {
        var cfg = new Plugin_parser(xml);
        expect(cfg.platforms.length).toBe(1);
        expect(cfg.platforms.indexOf('ios') > -1).toBe(true);
    });
});
