<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DamageEntriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('damage_entries')->insert([
            [
                'zone_id' => '1',
                'state_id'=>'15',
                'local_id'=>'266',
                'road_id'=>'3',
                'name' => 'Gideon Sunday',
                'phone' => '2349012345678',
                'identifier' => rand(111111111, 999999999),
                'status' => 1,
                'created_at' => Carbon\Carbon::now(),
            ],
            [
                'zone_id' => '1',
                'state_id'=>'15',
                'local_id'=>'263',
                'road_id'=>'2',
                'name' => 'Bajomo David',
                'phone' => '2349012345678',
                'identifier' => rand(111111111, 999999999),
                'status' => 2,
                'created_at' => Carbon\Carbon::now(),
            ],
            [
                'zone_id' => '1',
                'state_id'=>'15',
                'local_id'=>'266',
                'road_id'=>'5',
                'name' => 'Michael Andrew',
                'phone' => '2349012345678',
                'identifier' => rand(111111111, 999999999),
                'status' => 3,
                'created_at' => Carbon\Carbon::now(),
            ],
        ]);
    }
}
