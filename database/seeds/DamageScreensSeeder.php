<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DamageScreensSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('damage_screens')->insert([
            [
                'value' => "Welcome to FERMA Bad Road iReporter Platform ",
                'order' => 0,
                'con' => 1,
            ],
            [
                'value' => 'Please describe the location of the damage the best you can.',
                'order' => 1,
                'con' => 0,
            ],
        ]);
    }
}
