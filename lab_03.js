// lab_03.js

var db = db.getSisterDB("lab_03");

init = function () {

    var t = db.sensor_readings;

    if( t.count() ) {
        print("lab_03.sensor_readings will drop and reload...");
        t.drop();
    }

    var a = 0;
    for( var m = 0; m < 20000; m++ ) {

        var ts = new Date(2012,m%12,m%27+1);

        t.insert( { _id : m, tstamp : ts, active : (a%77==0), x : 99 } );

        a += 3;
    }

    printjson( db.getLastErrorObj() );

    print("still working...");
    t.update({},{$set:{str:"this is a test"}},false,true);
    printjson( db.getLastErrorObj() );

    print( "count: " + t.count() );
}

testIndex = function() { 
    var e = db.sensor_readings.find( {   tstamp : {      $gte : ISODate("2012-08-01"),      $lte :  ISODate("2012-09-01")    },   active : true } ).limit(3).explain();
    if( !e ) {
        print("Something's wrong... Again?");
        return;    }
    if( e.n != 3 ) { 
        print("3 result documents expected, but got: " + e.n);
        print("Again?");
        print("db.sensor_readings.count(): " + db.sensor_readings.count() + " (Expected 20000 documents)");
        return;    }
    if( e.nscanned > 500 ) { 
        print("Naa, there are still a whole lot of documents being scanned. You can do far better!");
        return; }
    if( e.nscanned > 10 ) { 
        print("This is pretty neat -- There were " + e.nscanned + " documents scanned.");
        print("But you still can do better than that! Try again!");
        return; }
    if( e.nscanned > 3 ) { 
        print("Now we are getting pretty close to the ideal result of 3 scanned documents! Challenge accepted?");
    }
    if( e.nscanned == 3 ) { 
        print("Excellent! Now you can call yourself a MongoDB Indexing Ninja!");
    }
}


initQuiztime = function () {

    var t = db.quiztime;

    if( t.count() ) {
        print("lab_03.quiztime will drop and reload...");
        t.drop();
    }
    
    db.quiztime.insert({a:100000,b:7000, c:10});
    db.quiztime.insert({a:1000,b:4000, c:55});
    db.quiztime.insert({a:500,b:500, c:500});
    db.quiztime.insert({a:10000,b:700, c:1});
    db.quiztime.insert({a:346546,b:3535, c:355});
    db.quiztime.insert({a:24254,b:436, c:2424});
    db.quiztime.insert({a:3454,b:242, c:4636});
    db.quiztime.insert({a:3535,b:99821, c:333});
    db.quiztime.insert({a:7533,b:22433, c:2442});
    db.quiztime.insert({a:2424,b:2523, c:2424});

    printjson( db.getLastErrorObj() );
    print( "count: " + t.count() );
}