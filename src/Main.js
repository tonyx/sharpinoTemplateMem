
(function (argv) {
    return Expecto_Tests_runTestsInAssemblyWithCLIArgs([], argv);
})(typeof process === 'object' ? process.argv.slice(2) : []);

