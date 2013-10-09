<?php

class BrandTableSeeder extends Seeder {

	public function run()
	{
            DB::table('brands')->delete();
            
            $arr = array(
                array('brandName' => 'Samsung'),
                array('brandName' => 'Apple'),
                array('brandName' => 'Nokia'),
                array('brandName' => 'BlackBerry')
            );

            DB::table('brands')->insert($arr);	
	}
}