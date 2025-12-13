import {
  cardClass,
  labelClass,
  inputClass,
} from "@pages/Product/components/utils";

export const UnitSection = ({ register }: any) => (
  <div className={cardClass}>
    <h2 className="text-lg font-semibold text-[#e1e1e1] border-b border-[#4d4d4d]/50 pb-3 mb-4">
      Units & Packaging
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
      <div>
        <label className={labelClass}>Base Unit</label>
        <input
          {...register("baseUnitName")}
          className={inputClass}
          placeholder="e.g. Can"
        />
      </div>
      <div>
        <label className={labelClass}>Package Unit</label>
        <input
          {...register("packageUnitName")}
          className={inputClass}
          placeholder="e.g. Box"
        />
      </div>
      <div>
        <label className={labelClass}>Items / Package</label>
        <input
          type="number"
          {...register("itemsPerPackage", { valueAsNumber: true })}
          className={inputClass}
        />
      </div>
    </div>
  </div>
);
