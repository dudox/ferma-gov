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

        ];
        foreach($roads as $road){
            Road::create($road);
        }
    }
}
