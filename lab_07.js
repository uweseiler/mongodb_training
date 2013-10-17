// lab_07.js

var db = db.getSisterDB("lab_07");

init = function() { 
    var t = db.trades;
    if( t.count() ) { 
        throw "lab_07.trades not empty, so won't init() if you want to reinit drop the collection first?";
    }
    o = { 
        ticker : 'abcd',
        time   : new Date(2012,2,3),
        price  : 110,
        shares : 200, 
        details : {
            asks : [ 110.07, 110.12, 110.30 ],
            bids : [ 109.90, 109.88, 109.70, 109.5 ], 
            system : 'abc',
            lag : 0
        }
    };
    t.insert(o);

    var j = 100;
    for( var i = 0; i < 500000; i++ ) { 
        if( i % 10000 == 0 ) { 
            print(db.getLastError() + ' ' + i);
        }
        if( ++j >= 500 ) j = 100;
        o.ticket = 'z' + j;
        o.time = new Date(2012, 2, 3, 9, i%60, (i/60)%60, (i/3600)%1000);
        t.insert(o);
    }
    printjson( db.getLastErrorObj() );
    print("count: " + t.count());
}

checkSharding = function() { 
    if( db.isMaster().msg != "isdbgrid" ) { 
        throw "connect to a mongos not a mongod. try again."; 
    }
    print('db.getSisterDB("config").shards.count() : ');
    var n = db.getSisterDB("config").shards.count();
    print(n);
    print("There are " + n + " shards in the cluster");
    if( n == 2 ) print("as expected");
    else print("expected 2 shards? something not as expected.");
}