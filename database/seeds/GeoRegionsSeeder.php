<?php

use App\GeoRegions;
use Illuminate\Database\Seeder;

class GeoRegionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $zones = [
            [
                'zone'=>'North Central',
                'color'=>'success'
            ],
            [
                'zone'=>'North East',
                'color'=>'primary'

            ],
            [
                'zone'=>'North West',
                'color'=>'danger'
            ],
            [
                'zone'=>'South East',
                'color'=>'dark'
            ],
            [
                'zone'=>'South South',
                'color'=>'info'
            ],
            [
                'zone'=>'South West',
                'color'=>'link'
            ]
        ];

        foreach($zones as $zone){
            GeoRegions::create($zone);
        }
    }
}
