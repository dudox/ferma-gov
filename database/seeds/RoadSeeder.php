<?php

use App\Road;
use Illuminate\Database\Seeder;

class RoadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $roads = [
            [
                'local_id' => '265',
                'name' => 'abaji-kwali',
            ],
            [
                'local_id' => '263',
                'name' => 'kwali-gwagwalada',
            ],
            [
                'local_id' => '266',
                'name' => 'gwagwalada-pasere',
            ],
            [
                'local_id' => '266',
                'name' => 'Bill clinton Highway',
            ],
            [
                'local_id' => '266',
                'name' => 'Umar Musa Yaradua',
            ],
            [
                'local_id' => '266',
                'name' => 'Murtala Muhammed expressway',
            ],
            [
                'local_id' => '266',
                'name' => 'Abuja-Keffi expressway',
            ],
            [
                'local_id' => '266',
                'name' => 'Nnamdi Azikiwe expressway',
            ],
            [
                'local_id' => '266',
                'name' => 'Pasere-Murtala Muhammed expressway',
            ],
            [
                'local_id' => '266',
                'name' => 'Abuja-Kaduna Highway',
            ],
            [
                'local_id' => '266',
                'name' => 'Constitution Avenue',
            ],
            [
                'local_id' => '266',
                'name' => 'Independence Avenue',
            ],
            [
                'local_id' => '262',
                'name' => 'Sagari-bwari',
            ],

            [
                'local_id' => '483',
                'name' => 'Lagos-Abeokuta Exp.',
            ],
            [
                'local_id' => '490',
                'name' => 'Lagos-Abeokuta Exp.',
            ],

            [
                'local_id' => '491',
                'name' => 'Agege motor road',
            ],
            [
                'local_id' => '498',
                'name' => 'Agege motor road',
            ],

	        [
                'local_id' => '491',
                'name' => 'Apapa owonronshoki Exp.',
            ],
            [
                'local_id' => '491',
                'name' => 'Mobolaji Anthony way',
            ],
            [
                'local_id' => '491',
                'name' => 'Lagos-Ibadan Exp.',
            ],
            [
                'local_id' => '491',
                'name' => 'Ikorodu road',
            ],
            [
                'local_id' => '493',
                'name' => 'Ikorodu road',
            ],
            [
                'local_id' => '493',
                'name' => 'Third Mainland Bridge',
            ],
            [
                'local_id' => '495',
                'name' => 'Third Mainland Bridge',
            ],
            [
                'local_id' => '495',
                'name' => 'Herbert Macaulay way',
            ],
            [
                'local_id' => '499',
                'name' => 'Herbert Macaulay way',
            ],
            [
                'local_id' => '495',
                'name' => 'Murtala Muhd. Way',
            ],
            [
                'local_id' => '495',
                'name' => 'Eko Brigde',
            ],
            [
                'local_id' => '495',
                'name' => 'Apapa Road',
            ],
            [
                'local_id' => '495',
                'name' => 'Iddo Road',
            ],
            [
                'local_id' => '496',
                'name' => 'Ikorodu road',
            ],
            [
                'local_id' => '496',
                'name' => 'Agege motor road',
            ],
            [
                'local_id' => '496',
                'name' => 'Western Avenue',
            ],
            [
                'local_id' => '493',
                'name' => 'Lagos-Ibadan Exp.',
            ],
            [
                'local_id' => '493',
                'name' => 'Third Axial road',
            ],
            [
                'local_id' => '500',
                'name' => 'Western Avenue',
            ],
            [
                'local_id' => '500',
                'name' => 'Lagos Badagry Exp.',
            ],
            [
                'local_id' => '482',
                'name' => 'Apapa owonronshoki Exp.',
            ],
            [
                'local_id' => '494',
                'name' => 'New Marina',
            ],
            [
                'local_id' => '494',
                'name' => 'Ring Road',
            ],
            [
                'local_id' => '485',
                'name' => 'Lagos-Badagry Exp.',
            ],
            [
                'local_id' => '482',
                'name' => 'Lagos-Badagry Exp.',
            ],
            [
                'local_id' => '484',
                'name' => 'Lagos-Badagry Exp.',
            ],

            [
                'local_id' => '486',
                'name' => 'Lagos-Badagry Exp.',
            ],

        ];
        foreach($roads as $road){
            Road::create($road);
        }
    }
}
