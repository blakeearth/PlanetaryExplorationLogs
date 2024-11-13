using System.ComponentModel.DataAnnotations;

namespace PlanetaryExplorationLogs.API.Utility.Helpers
{
    public static class ValidationHelper
    {
        public static bool IsValid(object obj, out string errorMessage)
        {
            var vContext = new ValidationContext(obj);
            var results = new List<ValidationResult>();

            if (!Validator.TryValidateObject(obj, vContext, results, true))
            {
                errorMessage = string.Join(", ", results.Select(result => result.ErrorMessage));
                return false;
            }

            errorMessage = "";
            return true;
        }
    }
}
