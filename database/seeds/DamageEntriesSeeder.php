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
                'location' => 'Garatu Village, Minna-Bida Road, Niger State',
                'name' => 'Gideon Sunday',
                'phone' => '2349012345678',
                'identifier' => rand(111111111, 999999999),
                'status' => 1,
                'created_at' => Carbon\Carbon::now(),
            ],
            [
                'location' => 'Dama, Minna-Bida Road, Niger State',
                'name' => 'Bajomo David',
                'phone' => '2349012345678',
                'identifier' => rand(111111111, 999999999),
                'status' => 2,
                'created_at' => Carbon\Carbon::now(),
            ],
            [
                'location' => 'Gurara, Minna, Niger State',
                'name' => 'Michael Andrew',
                'phone' => '2349012345678',
                'identifier' => rand(111111111, 999999999),
                'status' => 3,
                'created_at' => Carbon\Carbon::now(),
            ],
        ]);
    }
}
