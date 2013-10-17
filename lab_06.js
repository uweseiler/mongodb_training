// lab_06.js

var d = db.getSisterDB("lab_06");

init = function() { 
    if( rs.conf() != null ) { 
	print("at this stage of the lab the mongod should NOT be using --replSet");
	return;
    }
    if( d.foo.count() != 0 ) { 
	print("expected lab_06.foo collection to be empty to init. can't init. :-(");
	return;
    }
    for( var i = 0; i < 5000; i++ ) d.foo.insert({x:i,y:Math.random()});
    var result = db.getLastError();
    if( result ) print("Something is wrong? : " + result);
    else print("ok");
}
