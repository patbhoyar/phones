<?php

class PhoneTableSeeder extends Seeder{
    
    public function run(){

        DB::table('phones')->delete();
        
        $arr = array(
            array('modelName' => 'iPhone 5s', 'launchYear' => '2013', 'unitsSold' => '200 Million', 'image' => 'images/iphone5s.jpg', 'brandId' => 2),
            array('modelName' => 'iPhone 5c', 'launchYear' => '2013', 'unitsSold' => '389 Million', 'image' => 'images/iphone5c.jpg', 'brandId' => 2),
            array('modelName' => 'iPhone 5', 'launchYear' => '2012', 'unitsSold' => '389 Million', 'image' => 'images/iphone5s.jpg', 'brandId' => 2),
            array('modelName' => 'iPhone 4s', 'launchYear' => '2011', 'unitsSold' => '420 Million', 'image' => 'images/iphone5c.jpg', 'brandId' => 2),
            array('modelName' => 'iPhone 4', 'launchYear' => '2010', 'unitsSold' => '367 Million', 'image' => 'images/iphone5s.jpg', 'brandId' => 2),
            array('modelName' => 'iPhone 3gs', 'launchYear' => '2009', 'unitsSold' => '190 Million', 'image' => 'images/iphone5c.jpg', 'brandId' => 2),
            array('modelName' => 'Galaxy S4', 'launchYear' => '2013', 'unitsSold' => '408 Million', 'image' => 'images/iphone5s.jpg', 'brandId' => 1),
            array('modelName' => 'Galaxy S3', 'launchYear' => '2012', 'unitsSold' => '320 Million', 'image' => 'images/iphone5c.jpg', 'brandId' => 1),
            array('modelName' => 'Galaxy S2', 'launchYear' => '2011', 'unitsSold' => '197 Million', 'image' => 'images/iphone5s.jpg', 'brandId' => 1),
            array('modelName' => 'Galaxy S', 'launchYear' => '2010', 'unitsSold' => '75 Million', 'image' => 'images/iphone5c.jpg', 'brandId' => 1),
            array('modelName' => 'Lumia 1020', 'launchYear' => '2011', 'unitsSold' => '79 Million', 'image' => 'images/iphone5s.jpg', 'brandId' => 3),
            array('modelName' => 'N-80', 'launchYear' => '2008', 'unitsSold' => '57 Million', 'image' => 'images/iphone5c.jpg', 'brandId' => 3),
            array('modelName' => '7700', 'launchYear' => '2007', 'unitsSold' => '19 Million', 'image' => 'images/iphone5s.jpg', 'brandId' => 3),
            array('modelName' => '1100', 'launchYear' => '2005', 'unitsSold' => '379 Million', 'image' => 'images/iphone5c.jpg', 'brandId' => 3),
            array('modelName' => 'N-95', 'launchYear' => '2008', 'unitsSold' => '31 Million', 'image' => 'images/iphone5s.jpg', 'brandId' => 3),
            array('modelName' => 'Z30', 'launchYear' => '2012', 'unitsSold' => '32 Million', 'image' => 'images/iphone5c.jpg', 'brandId' => 4),
            array('modelName' => 'Z10', 'launchYear' => '2013', 'unitsSold' => '14 Million', 'image' => 'images/iphone5s.jpg', 'brandId' => 4),
            array('modelName' => 'Bold', 'launchYear' => '2012', 'unitsSold' => '26 Million', 'image' => 'images/iphone5c.jpg', 'brandId' => 4),
            array('modelName' => 'Curve', 'launchYear' => '2013', 'unitsSold' => '109 Million', 'image' => 'images/iphone5s.jpg', 'brandId' => 4),
        );
        
        DB::table('phones')->insert($arr);
        
    }
    
}

?>
