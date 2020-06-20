<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDamageEntriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('damage_entries', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('zone_id');
            $table->bigInteger('state_id');
            $table->bigInteger('local_id');
            $table->bigInteger('road_id');
            $table->string('phone');
            $table->string('identifier');
            $table->string('images')->nullable();
            $table->string('geolocation')->nullable();
            $table->string('name');
            $table->integer('status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('damage_entries');
    }
}
